// import React from 'react';
// import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
// import { Provider } from 'react-redux';
// import { StaticRouter } from 'react-router';

import { APP_CONTAINER_CLASS, STATIC_PATH, WDS_PORT } from '../config/app_config';
import { isProd } from './util';

// const renderApp = (location, plainPartialState, routerContext) => {

const renderApp = () => {
  // const store = initStore(plainPartialState);
  // const appHtml = ReactDOMServer.renderToString(
  //   <Provider store={store}>
  //     <StaticRouter location={location} context={routerContext}>
  //       <App />
  //     </StaticRouter>
  //   </Provider>
  // );
  const head = Helmet.rewind();

  return (
    `<!doctype html>
    <html>
      <head>
        ${head.title}
        ${head.meta}
        <link rel="stylesheet" href="${STATIC_PATH}/css/style.css">
      </head>
      <body>
        <div class="${APP_CONTAINER_CLASS}"></div>

        <script src="${isProd ? STATIC_PATH : `http://localhost:${WDS_PORT}/dist`}/js/bundle.js"></script>
    </body>
      </html>`
  );
};

export default renderApp;

/*  <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())}
  </script> */

/* ${appHtml} */
