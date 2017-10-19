import React from 'react';
import PropTypes from 'prop-types';
import AuthButtons from './components/authButtons';
import { logoutUser } from '../actions';
import UserController from '../controller';

class AuthButtonsContainer extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {};

    this.onClickSignOut = this.onClickSignOut.bind(this);
    this.getHeaders = this.getHeaders.bind(this);
  }

  componentWillMount() {
    this.setState({ headers: this.getHeaders() });
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      this.setState({
        headers: this.getHeaders(),
        user: UserController.currentUser(this.store),
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onClickSignOut() {
    this.store.dispatch(logoutUser());
  }

  getHeaders() {
    return this.store.getState().headers;
  }

  render() {
    return (
      <AuthButtons
        onClickSignOut={this.onClickSignOut}
        onClickLogin={this.props.onClickLogin}
        onClickSignUp={this.props.onClickSignUp}
        onClickProfile={this.props.onClickProfile}
        headers={this.state.headers}
        user={this.state.user}
      />
    );
  }
}

AuthButtonsContainer.propTypes = {
  onClickSignUp: PropTypes.func.isRequired,
  onClickLogin: PropTypes.func.isRequired,
  onClickProfile: PropTypes.func.isRequired,
};

AuthButtonsContainer.contextTypes = {
  store: PropTypes.object,
};

export default AuthButtonsContainer;
