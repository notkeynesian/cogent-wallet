/* eslint promise/always-return: 0, arrow-body-style: 0 */
export const WALLET_BALANCE_SUCCESS = 'WALLET_BALANCE_SUCCESS';

export function walletBalance() {
  return (dispatch, getState, grpc) => {
    return grpc.sendCommand('walletBalance').then(wallet => {
      dispatch(walletBalanceSuccess(wallet));
    }).catch(error => {
      throw (error);
    });
  };
}

export function walletBalanceSuccess(wallet) {
  return { type: 'WALLET_BALANCE_SUCCESS', wallet };
}
