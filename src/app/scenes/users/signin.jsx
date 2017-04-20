import React from 'react';
import { browserHistory } from 'react-router';
import routes from '../routes';
import SignInForm from '../../modules/user/Login/container';

class SignInScene extends React.Component {
  static onSignInSuccess() {
    browserHistory.push(routes.dashboard.show);
  }

  render() {
    return (
      <SignInForm
        onLoginSuccess={SignInScene.onSignInSuccess}
      />
    );
  }
}

export default SignInScene;
