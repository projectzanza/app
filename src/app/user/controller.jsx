import React from 'react';
import { browserHistory } from 'react-router';
import LoginContainer from './Login/container';
import RegisterContainer from './Register/container';

const UserController = {
  onLoginSuccess() {
    browserHistory.push('/dashboard');
  },

  onRegisterSuccess() {
    browserHistory.push('/login');
  },

  loginScene() {
    this.onLoginSuccess = function () {};
    return <LoginContainer onLoginSuccess={this.onLoginSuccess} />;
  },

  registerScene() {
    return <RegisterContainer onRegisterSuccess={this.onRegisterSuccess} />;
  },
};

export default UserController;
