import React from 'react';
import Helmet from 'react-helmet';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import { APP_NAME } from '../../config/app_config';
import Nav from './component/nav';
import HomePage from './component/page/home';
// import HelloPage from './component/page/hello';
// import HelloAsyncPage from './component/page/hello-async';
// import NotFoundPage from './component/page/not-found';
import Databases from './container/databases';
import Actions from './component/actions';

import '../static/scss/main.scss';

export const HOME_PAGE_ROUTE = '/';
export const ACTIONS_PAGE_ROUTE = '/actions';
export const DATABASES_PAGE_ROUTE = '/databases';
export const LOGIN_PAGE_ROUTE = '/login';

const App = () => (
  <div>
    <Helmet titleTemplate={`%s | ${APP_NAME}`} defaultTitle={APP_NAME} />
    <Nav />
    <Switch>
      <Route path={DATABASES_PAGE_ROUTE} render={() => <Databases />} />
      <Route path={ACTIONS_PAGE_ROUTE} render={() => <Actions />} />
      <Route exact path={HOME_PAGE_ROUTE} render={() => <HomePage />} />
    </Switch>
  </div>
);

export default App;


// <Switch>
//   // <Route exact path={HOME_PAGE_ROUTE} render={() => <HomePage />} />
//   //
//   // <Route path={HELLO_ASYNC_PAGE_ROUTE} render={() => <HelloAsyncPage />} />
//   // <Route component={NotFoundPage} />
// </Switch>
