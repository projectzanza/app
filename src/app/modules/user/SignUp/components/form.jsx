import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
} from 'react-bootstrap';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <form onSubmit={(e) => { this.props.onSubmit(e, this.state); }}>
        <FormGroup>
          <ControlLabel htmlFor="email">Email</ControlLabel>
          <FormControl
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel htmlFor="password">Password</ControlLabel>
          <FormControl
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel htmlFor="password_confirmation">Password Confirmation</ControlLabel>
          <FormControl
            type="password"
            name="password_confirmation"
            value={this.state.password_confirmation}
            onChange={this.onChange}
          />
        </FormGroup>

        <Button bsStyle="primary" type="submit"> Sign Up </Button>
      </form>
    );
  }
}

SignUp.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SignUp;
