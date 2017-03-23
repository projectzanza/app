import React from 'react';
import HeaderContainer from './container';
import UserController from '../user/controller';

class HeaderController {
  constructor(store) {
    this.store = store;
  }

  static scene() {
    return (
      <HeaderContainer
        authButtons={UserController.authButtons}
      />
    );
  }

}

export default HeaderController;
