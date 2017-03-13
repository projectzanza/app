import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <form onSubmit={(e) => { this.props.onSubmit(e, this.state); }}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.onChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.onChange}
        />

        <input type="submit" value="submit" />
      </form>
    );
  }
}

Login.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
};

export default Login;
