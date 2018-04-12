import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import ActionsGrpc from '../actions/grpc';

const ipc = require('electron').ipcRenderer;

const grpc = new ActionsGrpc(ipc);
grpc.initLnd();
grpc.initUnlocker();

const history = createBrowserHistory();
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk.withExtraArgument(grpc), router);

function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history };
