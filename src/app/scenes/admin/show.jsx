import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Panel } from 'react-bootstrap';
import User from '../../modules/user/model';
import UsersController from '../../modules/user/controller';
import UserList from '../../modules/user/List/container';
import routes from '../routes';

class AdminScene extends React.Component {

  static onClickUser(ev, user) {
    ev.preventDefault();
    browserHistory.push(routes.user.show(user.id));
  }

  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    Promise.all(this.fetchData()).then(() => {
      this.updateState();
      this.unsubscribe = this.store.subscribe(() => {
        this.updateState();
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  updateState() {
    this.setState({
      users: User.all(this.store),
    });
  }

  fetchData() {
    return [UsersController.fetchUsers(this.store)];
  }

  render() {
    return (
      <div>
        <Panel header={<h3>All Users</h3>}>
          <UserList
            users={this.state.users}
            onClickUser={AdminScene.onClickUser}
            allowCertifyUser
          />
        </Panel>

      </div>
    );
  }
}

AdminScene.contextTypes = {
  store: PropTypes.object,
};

export default AdminScene;
