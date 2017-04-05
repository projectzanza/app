import React from 'react';
import { Route, Router, browserHistory } from 'react-router';
import App from './app';
import UserController from './modules/user/controller';
import DashboardController from './modules/dashboard/controller';
import JobController from './modules/jobs/controller';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <Route path="signup" component={UserController.signUpScene} />
      <Route path="login" component={UserController.loginScene} />
      <Route component={UserController.session} >
        <Route path="dashboard" component={DashboardController.scene} />
        <Route path="/job/:id(/:mode)" component={JobController.showScene} />
      </Route>
    </Route>
  </Router>
);

export default routes;
