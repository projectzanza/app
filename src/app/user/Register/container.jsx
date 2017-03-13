import React from 'react';
import { browserHistory } from 'react-router';
import Register from './components/form';
import { createUser } from '../actions';

class RegisterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.submitRegisterForm = this.submitRegisterForm.bind(this);
  }

  submitRegisterForm(e, form) {
    e.preventDefault();
    const { store } = this.context;
    store.dispatch(createUser(form))
      .then(() => browserHistory.push('/login'));
  }

  render() {
    return (
      <Register onSubmit={this.submitRegisterForm} />
    );
  }
}

RegisterContainer.contextTypes = {
  store: React.PropTypes.object,
};

export default RegisterContainer;
