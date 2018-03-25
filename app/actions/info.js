export const GET_INFO = 'GET_INFO';

export function getInfoSuccess(info) {
  return { type: GET_INFO, info };
}

export function getInfo() {
  return (dispatch) => {
    const info = { alias: 'foo' };
    dispatch(getInfoSuccess(info));
  };
}
