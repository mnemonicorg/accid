import 'babel-polyfill';

import {
  createStore, applyMiddleware, compose
} from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import reducerStore from './redux/reducer/hello';
import { isProd } from '../util';

// dont know what this is to be honest. remove if it works without
/* eslint-disable no-underscore-dangle */
const composeEnhancers = (isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
// const preloadedState = window.__PRELOADED_STATE__;
/* eslint-enable no-underscore-dangle */

// get the current state from localstorage
const persistedState = localStorage.getItem('accidState')
  ? JSON.parse(localStorage.getItem('accidState')) : {};


let middleware = [thunkMiddleware];
if (!isProd) {
  middleware = [...middleware, logger];
}

export const store = createStore(
  reducerStore,
  persistedState, // add the localstorage state in when constructing the store
  composeEnhancers(applyMiddleware(...middleware))
);

// when the state updates, also update localstorage
store.subscribe(() => {
  localStorage.setItem('accidState', JSON.stringify(store.getState()));
});


export default {store};
