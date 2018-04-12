// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import info from './info';
import wallet from './wallet';

const rootReducer = combineReducers({
  router,
  info,
  wallet
});

export default rootReducer;
