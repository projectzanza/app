import React from 'react';
import { browserHistory } from 'react-router';
import LoginContainer from './Login/container';
import RegisterContainer from './SignUp/container';
import SessionContainer from './Session/container';
import AuthButtonsContainer from './AuthButtons/container';

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

  static session() {
    return <SessionContainer onAuthError={UserController.onAuthError} />;
  }

  static onClickLogin() {
    browserHistory.push('/login');
  }

  static onLogout() {
    browserHistory.push('/');
  }

  static onClickSignUp() {
    browserHistory.push('/signup');
  }

  static authButtons() {
    return (
      <AuthButtonsContainer
        onClickLogin={UserController.onClickLogin}
        onClickSignUp={UserController.onClickSignUp}
        onLogout={UserController.onLogout}
      />
    );
  }
}


export default UserController;
