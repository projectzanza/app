import React from 'react';
import { currentUser } from '../utils';

class SessionContainer extends React.Component {

  componentDidMount() {
    const { store } = this.context;
    const user = currentUser(store);
    if (!(user && user.authenticated)) {
      this.props.onAuthError();
    }
  }

  render() {
    const { store } = this.context;
    const user = currentUser(store);
    console.log(user);
    if (user && user.authenticated) {
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
