// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import info from './info';

const rootReducer = combineReducers({
  router,
  info,
});

export default rootReducer;
