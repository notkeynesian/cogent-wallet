// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import info from './info';

const rootReducer = combineReducers({
  counter,
  router,
  info,
});

export default rootReducer;
