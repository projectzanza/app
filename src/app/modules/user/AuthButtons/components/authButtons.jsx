import React from 'react';
import PropTypes from 'prop-types';
import {
  ButtonToolbar,
  Button,
} from 'react-bootstrap';
import User from '../../model';

class AuthButtons extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      headers: props.headers,
    };
    this.store = context.store;
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

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
        { this.state.headers['access-token'] ? this.loggedInState() : this.loggedOutState() }
      </ButtonToolbar>
    );
  }
}

AuthButtons.propTypes = {
  onClickLogin: PropTypes.func.isRequired,
  onClickSignOut: PropTypes.func.isRequired,
  onClickSignUp: PropTypes.func.isRequired,
  onClickProfile: PropTypes.func.isRequired,
  headers: PropTypes.shape({ 'access-token': PropTypes.string }).isRequired,
  user: User.propTypes,
};

AuthButtons.defaultProps = {
  user: undefined,
};

export default AuthButtons;
