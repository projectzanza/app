import React from 'react';
import PropTypes from 'prop-types';
import List from './components/list';
import User from '../model';
import UserController from '../controller';

class ListContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      users: this.props.users,
    };

    this.onClickInviteUser = this.onClickInviteUser.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ users: nextProps.users });
  }

  onClickInviteUser(ev, user) {
    ev.preventDefault();
    UserController.inviteUser(this.store, this.props.jobId, user.id);
  }

  render() {
    return (
      <List
        users={this.state.users}
        onClickInviteUser={this.props.allowInviteUser && this.onClickInviteUser}
        onClickUser={this.props.onClickUser}
      />
    );
  }
}

ListContainer.contextTypes = {
  store: PropTypes.object,
};

ListContainer.propTypes = {
  users: PropTypes.arrayOf(
    User.propTypes,
  ),
  onClickUser: PropTypes.func.isRequired,
  allowInviteUser: PropTypes.bool,
  jobId: PropTypes.string,
};

ListContainer.defaultProps = {
  allowInviteUser: undefined,
  match: undefined,
  invited: undefined,
  users: [],
  jobId: undefined,
};

export default ListContainer;
