import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';

import App from './app';
import { APP_CONTAINER_SELECTOR } from '../../config/app_config';

import {store} from './store';

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR);

const wrapApp = (AppComponent, reduxStore) => (
  <Provider store={reduxStore}>
    <BrowserRouter>
      <AppContainer>
        <AppComponent />
      </AppContainer>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(wrapApp(App, store), rootEl);

if (module.hot) {
  // flow-disable-next-line
  module.hot.accept('../webapp/app', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('../webapp/app').default;
    ReactDOM.render(wrapApp(NextApp, store), rootEl);
  });
}
