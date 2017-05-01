import React from 'react';
import PropTypes from 'prop-types';
import { Route, Router, browserHistory } from 'react-router';
import App from './scenes/app';
import UserSession from './scenes/users/session';
import JobShowScene from './scenes/jobs/show';
import UserShowScene from './scenes/users/show';
import UserSignInScene from './scenes/users/signin';
import UserSignUpScene from './scenes/users/signup';
import DashboardScene from './scenes/dashboard/show';

class Routes extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = this.context.store;
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App} >
          <Route path="signup" component={UserSignUpScene} />
          <Route path="signin" component={UserSignInScene} />
          <Route component={UserSession} >
            <Route path="/dashboard" component={DashboardScene} />
            <Route path="/job/:id(/:mode)" component={JobShowScene} />
            <Route path="/user/:id(/:mode)" component={UserShowScene} />
            <Route path="/job/:jobId/user/:id" component={UserShowScene} />
          </Route>
        </Route>
      </Router>
    );
  }
}

Routes.contextTypes = {
  store: PropTypes.object,
};

export default Routes;
