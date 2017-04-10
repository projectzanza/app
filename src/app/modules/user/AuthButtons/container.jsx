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
      this.setState({ user: currentUser(this.store) });
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
        onClickProfile={this.props.onClickProfile}
        user={this.state.user}
      />
    );
  }
}

AuthButtonsContainer.propTypes = {
  onClickSignUp: React.PropTypes.func.isRequired,
  onClickLogin: React.PropTypes.func.isRequired,
  onClickProfile: React.PropTypes.func.isRequired,
  onLogout: React.PropTypes.func.isRequired,
};

AuthButtonsContainer.contextTypes = {
  store: React.PropTypes.object,
};

export default AuthButtonsContainer;
