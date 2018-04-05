/* eslint promise/always-return: 0, arrow-body-style: 0 */
export const GET_INFO_SUCCESS = 'GET_INFO_SUCCESS';

export function getInfo() {
  return (dispatch, getState, grpc) => {
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
