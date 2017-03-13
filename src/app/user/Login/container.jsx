import React from 'react';
import LoginForm from './components/form';
// import { loginUser } from '../actions';

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.submitLoginForm = this.submitLoginForm.bind(this);
  }

  submitLoginForm(e) {
    e.preventDefault();
    // const { store } = this.context;
    // store.dispatch(loginUser(form))
    //   .then(this.props.onLoginSuccess);
    this.props.onLoginSuccess();
  }

  render() {
    return (
      <LoginForm onSubmit={this.submitLoginForm} />
    );
  }
}

LoginContainer.contextTypes = {
  store: React.PropTypes.object,
};

LoginContainer.propTypes = {
  onLoginSuccess: React.PropTypes.func.isRequired,
};

export default LoginContainer;
