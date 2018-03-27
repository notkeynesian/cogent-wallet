/* eslint promise/catch-or-return: 0, func-names: 0,
prefer-arrow-callback: 0, promise/always-return: 0 */

import ActionsGrpc from './grpc';

const ipc = require('electron').ipcRenderer;

export const GET_INFO = 'GET_INFO';

export function getInfoSuccess(info) {
  return { type: GET_INFO, info };
}

export function getInfo() {
  return (dispatch) => {
    const store = {
      lndReady: false
    };

    const grpc = new ActionsGrpc(store, ipc);
    grpc.initLnd();

    grpc.sendCommand('getInfo')
      .then(function (foo) {
        const info = { alias: foo.alias };
        dispatch(getInfoSuccess(info));
      });
  };
}
