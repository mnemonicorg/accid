import 'babel-polyfill';

import {
  createStore, applyMiddleware, compose
} from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import reducerStore from '../shared/redux/reducer/hello';
import { isProd } from '../shared/util';


/* eslint-disable no-underscore-dangle */
const composeEnhancers = (isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
// const preloadedState = window.__PRELOADED_STATE__;
/* eslint-enable no-underscore-dangle */


let middleware = [thunkMiddleware];
if (!isProd) {
  middleware = [...middleware, logger];
}

export const store = createStore(
  reducerStore,
  // {
  //   hello: 'aaaaaaaaaaa', // todo - figure out how this is even helpful. --- lol it not
  //   dbs: {[]} //preloadedState.dbs
  // },
  composeEnhancers(applyMiddleware(...middleware))
);


export default {store};
