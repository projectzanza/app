import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import routes from '../routes';
import SignInForm from '../../modules/user/Login/container';
import UserController from '../../modules/user/controller';

class SignInScene extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;

    this.onSignInSuccess = this.onSignInSuccess.bind(this);
  }

  onSignInSuccess() {
    const currentUser = UserController.currentUser(this.store);
    if (currentUser.admin) {
      browserHistory.push(routes.dashboard.admin);
    } else {
      browserHistory.push(routes.dashboard.show);
    }
  }

  render() {
    return (
      <SignInForm
        onLoginSuccess={this.onSignInSuccess}
      />
    );
  }
}

SignInScene.contextTypes = {
  store: PropTypes.object,
};

export default SignInScene;
