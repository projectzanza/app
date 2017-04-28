import React from 'react';
import {
  ButtonToolbar,
  Button,
} from 'react-bootstrap';
import User from '../../model';

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
        <Button onClick={this.props.onClickSignOut}> Logout </Button>
      </ButtonToolbar>
    );
  }

  render() {
    return (
      <ButtonToolbar>
        { !(this.props.user) && this.loggedOutState() }
        { this.props.user && this.loggedInState() }
      </ButtonToolbar>
    );
  }
}

AuthButtons.propTypes = {
  onClickLogin: React.PropTypes.func.isRequired,
  onClickSignOut: React.PropTypes.func.isRequired,
  onClickSignUp: React.PropTypes.func.isRequired,
  onClickProfile: React.PropTypes.func.isRequired,
  user: User.propTypes,
};

AuthButtons.defaultProps = {
  user: undefined,
};

export default AuthButtons;
