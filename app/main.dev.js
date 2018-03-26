/* eslint global-require: 0, no-unused-vars: 0, no-shadow: 0, no-unused-expressions: 0,
flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, ipcMain } from 'electron';
import log from 'electron-log';
import ps from 'ps-node';
import grcpClient from './grpc-client';
import { startLndProcess, startBtcdProcess } from './lnd-child-process';
import MenuBuilder from './menu';

// *************************
// ********* INIT **********
// *************************

const LND_NAME = 'lnd';
const LND_DATA_DIR = 'data/lnd_data';
const LND_LOG_DIR = 'data/lnd_log';
const BTCD_DATA_DIR = 'data/btcd_data';
const BTCD_LOG_DIR = 'data/btcd_log';
const LND_PORT = 10009;
const LND_PEER_PORT = 10019;
const isDev = process.env.NODE_ENV === 'development';
// reevaluate these later;
const MACAROONS_ENABLED = false; // was def in diff location in original code

let mainWindow = null;
let lndProcess;
let btcdProcess;

// *************************
// ******** LOGGING ********
// *************************

log.transports.console.level = 'info';
log.transports.file.level = 'info';
ipcMain.on('log', (event, arg) => log.info(...arg));
ipcMain.on('log-error', (event, arg) => log.error(...arg));

let logQueue = [];
let logsReady = false;

const sendLog = log => {
  if (mainWindow && logsReady) {
    mainWindow.webContents.send('logs', log);
  } else {
    logQueue.push(log);
  }
};
const Logger = {
  info: msg => {
    log.info(msg);
    sendLog(msg);
  },
  error: msg => {
    log.error(msg);
    sendLog(`ERROR: ${msg}`);
  },
};
ipcMain.on('logs-ready', () => {
  logQueue.map(line => mainWindow && mainWindow.webContents.send('logs', line));
  logQueue = [];
  logsReady = true;
});

// *************************
// ******* LIGHTNING *******
// *************************

const startLnd = async () => {
  try {
    // not loading btcd yet as i dont have binaries, using neutrino to start.
    /*
    btcdProcess = await startBtcdProcess({
      isDev,
      logger: Logger,
      btcdLogDir: BTCD_LOG_DIR,
      btcdDataDir: BTCD_DATA_DIR,
    });
    */
    lndProcess = await startLndProcess({
      isDev,
      macaroonsEnabled: MACAROONS_ENABLED,
      lndDataDir: LND_DATA_DIR,
      lndLogDir: LND_LOG_DIR,
      lndPort: LND_PORT,
      lndPeerPort: LND_PEER_PORT,
      logger: Logger,
    });
  } catch (err) {
    Logger.error(`Caught Error When Starting ${LND_NAME}: ${err}`);
  }
};

ps.lookup({ command: LND_NAME }, (err, resultList) => {
  if (err) {
    Logger.info(`lnd ps lookup error: ${err}`);
  } else if (resultList) {
    Logger.info(`lnd will run on port ${LND_PORT}, ${LND_DATA_DIR}`);
    startLnd();
  } else {
    startLnd();
  }
});

app.on('quit', () => {
  lndProcess && lndProcess.kill();
  btcdProcess && btcdProcess.kill();
});

// *************************
// ****** CHETSULIN ********
// *************************

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};


/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  grcpClient.init({
    ipcMain,
    lndPort: LND_PORT,
    lndDataDir: LND_DATA_DIR,
    macaroonsEnabled: MACAROONS_ENABLED,
  });
});
