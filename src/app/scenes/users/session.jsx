import React from 'react';
import { browserHistory } from 'react-router';
import routes from '../routes';
import UserController from '../../modules/user/controller';
import SessionContainer from '../../modules/user/Session/container';

class UserSession extends React.Component {
  static onAuthError() {
    browserHistory.push(routes.app.login);
  }

  constructor(props, context) {
    super(props, context);
    this.store = context.store;
  }

  render() {
    return (
      <SessionContainer
        onAuthError={UserSession.onAuthError}
        currentUser={UserController.currentUser(this.store)}
      >{ this.props.children }
      </SessionContainer>
    );
  }
}

UserSession.contextTypes = {
  store: React.PropTypes.object,
};

UserSession.propTypes = {
  children: React.PropTypes.node,
};

UserSession.getDefaultProps = {
  children: null,
};

export default UserSession;