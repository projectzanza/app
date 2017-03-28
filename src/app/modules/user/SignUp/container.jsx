import React from 'react';
import SignUp from './components/form';
import { createUser } from '../actions';

class RegisterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.submitSignUpForm = this.submitSignUpForm.bind(this);
  }

  submitSignUpForm(e, form) {
    e.preventDefault();
    const { store } = this.context;
    store.dispatch(createUser(form))
      .then(this.props.onSignUpSuccess);
  }

  render() {
    return (
      <SignUp onSubmit={this.submitSignUpForm} />
    );
  }
}

RegisterContainer.contextTypes = {
  store: React.PropTypes.object,
};

RegisterContainer.propTypes = {
  onSignUpSuccess: React.PropTypes.func.isRequired,
};

export default RegisterContainer;
