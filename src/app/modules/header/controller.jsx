import React from 'react';
import { browserHistory } from 'react-router';
import HeaderContainer from './container';
import UserController from '../user/controller';

class HeaderController {
  static onClickTitle(ev) {
    ev.preventDefault();
    browserHistory.push('/dashboard');
  }

  static scene() {
    return (
      <HeaderContainer
        onClickTitle={HeaderController.onClickTitle}
        authButtons={UserController.authButtons}
      />
    );
  }

}

export default HeaderController;
