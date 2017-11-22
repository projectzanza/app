import React from 'react';
import { browserHistory } from 'react-router';
import routes from '../routes';
import SignUpForm from '../../modules/user/SignUp/container';

class SignUpScene extends React.Component {
  static onSignUpSuccess() {
    browserHistory.push(routes.app.confirm);
  }

  constructor(props, context) {
    super(props);
    this.store = context.store;
  }

  render() {
    return (
      <SignUpForm
        onSignUpSuccess={SignUpScene.onSignUpSuccess}
      />
    );
  }
}

export default SignUpScene;
