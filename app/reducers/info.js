// @flow
/* eslint flowtype/no-weak-types: 0 */
import { GET_INFO } from '../actions/info';
import initialState from './initialState';

export type infoType = {
  alias: string
};

export default function counter(state: infoType = initialState.info, action: any) {
  switch (action.type) {
    case GET_INFO:
      return action.info;

    default:
      return state;
  }
}
