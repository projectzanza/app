import React from 'react';
import PropTypes from 'prop-types';
import UserController from '../controller';

class SessionContainer extends React.Component {

  componentDidMount() {
    const { store } = this.context;
    const user = UserController.currentUser(store);
    if (!user) {
      this.props.onAuthError();
    }
  }

  render() {
    const { store } = this.context;
    const user = UserController.currentUser(store);

    if (user) {
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
