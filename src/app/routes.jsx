import React from 'react';
import { Route, Router, browserHistory } from 'react-router';
import App from './app';
import UserController from './user/controller';
import DashboardController from './dashboard/controller';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <Route path="signup" component={UserController.signUpScene} />
      <Route path="login" component={UserController.loginScene} />
      <Route component={UserController.auth} >
        <Route path="dashboard" component={DashboardController.scene} />
      </Route>
    </Route>
  </Router>
);

export default routes;
