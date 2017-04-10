import React from 'react';
import AuthButtons from './components/authButtons';
import { logoutUser } from '../actions';
import { currentUser } from '../utils';

class AuthButtonsContainer extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = { authenticated: false };
    this.store = context.store;
    this.onClickLogout = this.onClickLogout.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      if (currentUser(this.store)) {
        this.setState({ authenticated: currentUser(this.store).authenticated });
      } else {
        this.setState({ authenticated: false });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onClickLogout() {
    this.store.dispatch(logoutUser())
      .then(this.props.onLogout);
  }

  render() {
    return (
      <AuthButtons
        onClickLogout={this.onClickLogout}
        onClickLogin={this.props.onClickLogin}
        onClickSignUp={this.props.onClickSignUp}
        authenticated={this.state.authenticated}
      />
    );
  }
}

AuthButtonsContainer.propTypes = {
  onClickSignUp: React.PropTypes.func.isRequired,
  onClickLogin: React.PropTypes.func.isRequired,
  onLogout: React.PropTypes.func.isRequired,
};

AuthButtonsContainer.contextTypes = {
  store: React.PropTypes.object,
};

export default AuthButtonsContainer;
