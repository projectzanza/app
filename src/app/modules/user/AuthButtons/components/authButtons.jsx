import React from 'react';
import {
  ButtonToolbar,
  Button,
} from 'react-bootstrap';

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
    return <Button onClick={this.props.onClickLogout}> Logout </Button>;
  }

  render() {
    return (
      <ButtonToolbar>
        { !this.props.authenticated && this.loggedOutState() }
        { this.props.authenticated && this.loggedInState() }
      </ButtonToolbar>
    );
  }
}

AuthButtons.propTypes = {
  onClickLogin: React.PropTypes.func.isRequired,
  onClickLogout: React.PropTypes.func.isRequired,
  onClickSignUp: React.PropTypes.func.isRequired,
  authenticated: React.PropTypes.bool.isRequired,
};

export default AuthButtons;
