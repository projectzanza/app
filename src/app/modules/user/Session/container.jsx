import React from 'react';
import PropTypes from 'prop-types';

class SessionContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {};
  }

  componentWillMount() {
    this.setState({ token: this.accessToken() });
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      this.setState({ token: this.accessToken() });

      if (!this.state.token) {
        this.props.onAuthError();
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  accessToken() {
    return this.store.getState().headers['access-token'];
  }

  render() {
    if (this.state.token) {
      return this.props.children;
    }
    return null;
  }
}

SessionContainer.contextTypes = {
  store: PropTypes.object,
};

SessionContainer.propTypes = {
  onAuthError: PropTypes.func.isRequired,
  children: PropTypes.node,
};
SessionContainer.getDefaultProps = {
  children: null,
};

export default SessionContainer;
