import React from 'react';
import { browserHistory } from 'react-router';
import routes from '../routes';
import SignUpForm from '../../modules/user/SignUp/container';
import AlertController from '../../modules/alerts/controller';

class SignUpScene extends React.Component {
  constructor(props, context) {
    super(props);
    this.store = context.store;
    this.onSignUpSuccess = this.onSignUpSuccess.bind(this);
  }

  onSignUpSuccess() {
    browserHistory.push(routes.dashboard.show);
    AlertController.dispatchAlert(this.store.dispatch, 'success', 'Check your email to confirm your email address');
  }

  render() {
    return (
      <SignUpForm
        onSignUpSuccess={this.onSignUpSuccess}
      />
    );
  }
}

export default SignUpScene;
