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
    this.onClickAwardUser = this.onClickAwardUser.bind(this);
    this.onClickRejectUser = this.onClickRejectUser.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ users: nextProps.users });
  }

  onClickInviteUser(ev, user) {
    ev.preventDefault();
    UserController.inviteUser(this.store, this.props.jobId, user.id);
  }

  onClickAwardUser(ev, user) {
    ev.preventDefault();
    UserController.awardJob(this.store, this.props.jobId, user.id);
  }

  onClickRejectUser(ev, user) {
    ev.preventDefault();
    UserController.rejectUser(this.store, this.props.jobId, user.id);
  }

  render() {
    return (
      <List
        users={this.state.users}
        jobId={this.props.jobId}
        onClickInviteUser={this.props.allowInviteUser && this.onClickInviteUser}
        onClickAwardUser={this.props.allowAwardUser && this.onClickAwardUser}
        onClickRejectUser={this.props.allowRejectUser && this.onClickRejectUser}
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
  allowAwardUser: PropTypes.bool,
  allowRejectUser: PropTypes.bool,
  jobId: PropTypes.string,
};

ListContainer.defaultProps = {
  allowInviteUser: undefined,
  allowAwardUser: undefined,
  allowRejectUser: undefined,
  match: undefined,
  invited: undefined,
  users: [],
  jobId: undefined,
};

export default ListContainer;
