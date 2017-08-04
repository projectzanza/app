import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
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

    this.onClickInviteUserFunc = this.onClickInviteUserFunc.bind(this);
    this.onClickAwardUserFunc = this.onClickAwardUserFunc.bind(this);
    this.onClickRejectUserFunc = this.onClickRejectUserFunc.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ users: nextProps.users });
  }

  onClickInviteUserFunc(user) {
    if ([undefined, 'interested'].indexOf(_.get(user, 'meta.job.collaboration_state')) >= 0) {
      return (ev, clickedUser) => {
        ev.preventDefault();
        UserController.inviteUser(this.store, this.props.jobId, clickedUser.id);
      };
    }
    return undefined;
  }

  onClickAwardUserFunc(user) {
    if (['awarded', 'participant'].indexOf(_.get(user, 'meta.job.collaboration_state')) < 0) {
      return (ev, clickedUser) => {
        ev.preventDefault();
        UserController.awardJob(this.store, this.props.jobId, clickedUser.id);
      };
    }
    return undefined;
  }

  onClickRejectUserFunc(user) {
    if (_.get(user, 'meta.job.collaboration_state')) {
      return (ev, clickedUser) => {
        ev.preventDefault();
        UserController.rejectUser(this.store, this.props.jobId, clickedUser.id);
      };
    }
    return undefined;
  }

  render() {
    return (
      <List
        users={this.state.users}
        jobId={this.props.jobId}
        onClickInviteUserFunc={
          this.props.allowChangeCollaborationState && this.onClickInviteUserFunc
        }
        onClickAwardUserFunc={
          this.props.allowChangeCollaborationState && this.onClickAwardUserFunc
        }
        onClickRejectUserFunc={
          this.props.allowChangeCollaborationState && this.onClickRejectUserFunc
        }
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
  allowChangeCollaborationState: PropTypes.bool,
  jobId: PropTypes.string,
};

ListContainer.defaultProps = {
  allowChangeCollaborationState: undefined,
  match: undefined,
  invited: undefined,
  users: [],
  jobId: undefined,
};

export default ListContainer;
