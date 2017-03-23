import React from 'react';

class SessionContainer extends React.Component {

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

SessionContainer.contextTypes = {
  store: React.PropTypes.object,
};

SessionContainer.propTypes = {
  onAuthError: React.PropTypes.func.isRequired,
  children: React.PropTypes.node,
};
SessionContainer.getDefaultProps = {
  children: null,
};

export default SessionContainer;
