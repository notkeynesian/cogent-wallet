// @flow
/* eslint flowtype/no-weak-types: 0 */

import { WALLET_BALANCE_SUCCESS } from '../actions/wallet';
import initialState from './initialState';

export default function walletReducer(state: any = initialState.wallet, action: any) {
  switch (action.type) {
    case WALLET_BALANCE_SUCCESS:
      return action.wallet;

    default:
      return state;
  }
}
