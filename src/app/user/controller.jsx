import React from 'react';
import { browserHistory } from 'react-router';
import LoginContainer from './Login/container';
import RegisterContainer from './SignUp/container';
import AuthContainer from './Auth/container';

class UserController {
  constructor(store) {
    this.store = store;
  }

  static onLoginSuccess() {
    browserHistory.push('/dashboard');
  }

  static onSignUpSuccess() {
    browserHistory.push('/login');
  }

  static loginScene() {
    return <LoginContainer onLoginSuccess={UserController.onLoginSuccess} />;
  }

  static signUpScene() {
    return <RegisterContainer onSignUpSuccess={UserController.onSignUpSuccess} />;
  }

  static onAuthError() {
    browserHistory.push('/login');
  }

  static auth() {
    return <AuthContainer onAuthError={UserController.onAuthError} />;
  }
}


export default UserController;
