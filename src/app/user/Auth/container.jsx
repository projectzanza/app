import React from 'react';

class AuthContainer extends React.Component {

  componentDidMount() {
    const { store } = this.context;
    if (!(store.getState().user && store.getState().user.authenticated)) {
      this.props.onAuthError();
    }
  }

  render() {
    const { store } = this.context;
    if (store.user && store.user.authenticated) {
      return this.props.children;
    }
    return null;
  }
}

AuthContainer.contextTypes = {
  store: React.PropTypes.object,
};

AuthContainer.propTypes = {
  onAuthError: React.PropTypes.func.isRequired,
  children: React.PropTypes.node,
};
AuthContainer.getDefaultProps = {
  children: null,
};

export default AuthContainer;
