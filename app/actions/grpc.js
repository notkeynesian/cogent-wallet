/* eslint no-underscore-dangle: 0, no-param-reassign: 0 */

import { Duplex } from 'stream';

class ActionsGrpc {
  constructor(ipcRenderer) {
    this._ipcRenderer = ipcRenderer;
    this.isLndReady = false;
    this.isUnlockerReady = false;
  }

  async initUnlocker() {
    await this._sendIpc('unlockInit', 'unlockReady');
    console.log('GRPC unlockerReady');
    this.isUnlockerReady = true;
  }

  async sendUnlockerCommand(method, body) {
    return this._sendIpc('unlockRequest', 'unlockResponse', method, body);
  }

  async initLnd() {
    await this._sendIpc('lndInit', 'lndReady');
    console.log('GRPC lndReady');
    this.isLndReady = true;
  }

  sendCommand(method, body) {
    return this._sendIpc('lndRequest', 'lndResponse', method, body);
  }

  sendStreamCommand(method, body) {
    const self = this;
    const stream = new Duplex({
      write(data) {
        data = JSON.parse(data.toString('utf8'));
        self._ipcRenderer.send('lndStreamWrite', { method, data });
      },
      read() {},
    });
    this._ipcRenderer.on(`lndStreamEvent_${method}`, (e, arg) => {
      stream.emit(arg.event, arg.data || arg.err);
    });
    this._ipcRenderer.send('lndStreamRequest', { method, body });
    return stream;
  }

  _sendIpc(event, listen, method, body) {
    return new Promise((resolve, reject) => {
      listen = method ? `${listen}_${method}` : listen;
      this._ipcRenderer.once(listen, (e, arg) => {
        if (arg.err) {
          console.log('GRPC: Error from method', method, arg.err);
          return reject(arg.err);
        }
        resolve(arg.response);
      });
      this._ipcRenderer.send(event, { method, body });
    });
  }
}

export default ActionsGrpc;
