// @flow
/* eslint flowtype/no-weak-types: 0 */

import { GET_INFO_SUCCESS } from '../actions/info';
import initialState from './initialState';

export default function infoReducer(state: any = initialState.info, action: any) {
  switch (action.type) {
    case GET_INFO_SUCCESS:
      return action.info;

    default:
      return state;
  }
}
