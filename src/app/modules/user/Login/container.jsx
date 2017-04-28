import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from './components/form';
import { loginUser } from '../actions';

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.submitLoginForm = this.submitLoginForm.bind(this);
  }

  submitLoginForm(e, form) {
    e.preventDefault();
    const { store } = this.context;
    store.dispatch(loginUser(form))
      .then(this.props.onLoginSuccess);
  }

  render() {
    return (
      <LoginForm onSubmit={this.submitLoginForm} />
    );
  }
}

LoginContainer.contextTypes = {
  store: PropTypes.object,
};

LoginContainer.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};

export default LoginContainer;
