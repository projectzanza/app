import React from 'react';
import {
  ButtonToolbar,
  Button,
} from 'react-bootstrap';
import UserPropTypes from '../../propTypes';

class AuthButtons extends React.Component {

  loggedOutState() {
    return (
      <div>
        <Button onClick={this.props.onClickLogin}> Login </Button>
        <Button onClick={this.props.onClickSignUp}> Register </Button>
      </div>
    );
  }

  loggedInState() {
    return (
      <ButtonToolbar>
        <Button onClick={() => this.props.onClickProfile(this.props.user)}> Profile </Button>
        <Button onClick={this.props.onClickLogout}> Logout </Button>
      </ButtonToolbar>
    );
  }

  render() {
    const loggedInUser = this.props.user && this.props.user.authenticated;
    return (
      <ButtonToolbar>
        { !(loggedInUser) && this.loggedOutState() }
        { loggedInUser && this.loggedInState() }
      </ButtonToolbar>
    );
  }
}

AuthButtons.propTypes = {
  onClickLogin: React.PropTypes.func.isRequired,
  onClickLogout: React.PropTypes.func.isRequired,
  onClickSignUp: React.PropTypes.func.isRequired,
  onClickProfile: React.PropTypes.func.isRequired,
  user: UserPropTypes,
};

AuthButtons.defaultProps = {
  user: undefined,
};

export default AuthButtons;
