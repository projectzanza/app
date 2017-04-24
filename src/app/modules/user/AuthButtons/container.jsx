import React from 'react';
import AuthButtons from './components/authButtons';
import { logoutUser } from '../actions';
import UserController from '../controller';

class AuthButtonsContainer extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.store = context.store;
    this.onClickSignOut = this.onClickSignOut.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      this.setState({ user: UserController.currentUser(this.store) });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onClickSignOut() {
    this.store.dispatch(logoutUser())
      .then(this.props.onSignOut);
  }

  render() {
    return (
      <AuthButtons
        onClickSignOut={this.onClickSignOut}
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
  onSignOut: React.PropTypes.func.isRequired,
};

AuthButtonsContainer.contextTypes = {
  store: React.PropTypes.object,
};

export default AuthButtonsContainer;
