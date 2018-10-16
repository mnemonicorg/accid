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
import Login from './component/page/login';

import '../scss/main.scss';

import {
  DATABASES_PAGE_ROUTE,
  ACTIONS_PAGE_ROUTE,
  HOME_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE
} from './routes';


const App = () => (
  <div>
    <Helmet titleTemplate={`%s | ${APP_NAME}`} defaultTitle={APP_NAME} />
    <Nav />
    <Switch>
      <Route path={LOGIN_PAGE_ROUTE} render={() => <Login />} />
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
