import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import routes from '../routes';
import SessionContainer from '../../modules/user/Session/container';
import UserController from '../../modules/user/controller';

class AdminSession extends React.Component {
  static onAuthError() {
    browserHistory.push(routes.dashboard.show);
  }

  constructor(props, context) {
    super(props, context);
    this.store = context.store;

    this.validSession = this.validSession.bind(this);
  }

  validSession() {
    const currentUser = UserController.currentUser(this.store);
    console.log(currentUser);
    return currentUser && currentUser.admin;
  }

  render() {
    return (
      <SessionContainer
        onAuthError={AdminSession.onAuthError}
        validSession={this.validSession}
      >
        { this.props.children }
      </SessionContainer>
    );
  }
}

AdminSession.contextTypes = {
  store: PropTypes.object,
};

AdminSession.propTypes = {
  children: PropTypes.node,
};

AdminSession.getDefaultProps = {
  children: null,
};

export default AdminSession;
