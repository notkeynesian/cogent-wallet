/* eslint promise/always-return: 0 */

import ActionsGrpc from './grpc';

const ipc = require('electron').ipcRenderer;

export const GET_INFO_SUCCESS = 'GET_INFO_SUCCESS';

export function getInfo() {
  return (dispatch) => {
    const store = {
      lndReady: false
    };
    const grpc = new ActionsGrpc(store, ipc);
    grpc.initLnd();
    return grpc.sendCommand('getInfo').then(info => {
      dispatch(getInfoSuccess(info));
    }).catch(error => {
      throw (error);
    });
  };
}

export function getInfoSuccess(info) {
  return { type: 'GET_INFO_SUCCESS', info };
}
