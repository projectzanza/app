import React from 'react';
import { Route, Router, browserHistory } from 'react-router';

import App from './app';
import UserController from './user/controller';


const userController = new UserController();

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <Route path="register" component={userController.registerScene} />
      <Route path="login" component={userController.loginScene} />
    </Route>
  </Router>
);

export default routes;

