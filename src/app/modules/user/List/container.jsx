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
    this.onClickCertifyUserFunc = this.onClickCertifyUserFunc.bind(this);
    this.onClickDecertifyUserFunc = this.onClickDecertifyUserFunc.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ users: nextProps.users });
  }

  onClickInviteUserFunc(user) {
    if (
      this.props.allowChangeCollaborationState &&
      [undefined, 'interested'].indexOf(_.get(user, 'meta.job.collaboration_state')) >= 0
    ) {
      return (ev, clickedUser) => {
        ev.preventDefault();
        UserController.inviteUser(this.store, this.props.jobId, clickedUser.id);
      };
    }
    return undefined;
  }

  onClickAwardUserFunc(user) {
    if (
      this.props.allowChangeCollaborationState &&
      ['awarded', 'accepted'].indexOf(_.get(user, 'meta.job.collaboration_state')) < 0
    ) {
      return (ev, clickedUser) => {
        ev.preventDefault();
        UserController.awardJob(this.store, this.props.jobId, clickedUser.id);
      };
    }
    return undefined;
  }

  onClickRejectUserFunc(user) {
    if (
      this.props.allowChangeCollaborationState &&
      _.get(user, 'meta.job.collaboration_state')
    ) {
      return (ev, clickedUser) => {
        ev.preventDefault();
        UserController.rejectUser(this.store, this.props.jobId, clickedUser.id);
      };
    }
    return undefined;
  }

  onClickCertifyUserFunc() {
    if (this.props.allowCertifyUser) {
      return (ev, clickedUser) => {
        ev.preventDefault();
        UserController.certifyUser(this.store, clickedUser.id);
      };
    }
    return undefined;
  }

  onClickDecertifyUserFunc() {
    if (this.props.allowCertifyUser) {
      return (ev, clickedUser) => {
        ev.preventDefault();
        UserController.decertifyUser(this.store, clickedUser.id);
      };
    }
    return undefined;
  }

  render() {
    return (
      <List
        users={this.state.users}
        jobId={this.props.jobId}
        onClickInviteUserFunc={this.onClickInviteUserFunc}
        onClickAwardUserFunc={this.onClickAwardUserFunc}
        onClickRejectUserFunc={this.onClickRejectUserFunc}
        onClickCertifyUserFunc={this.onClickCertifyUserFunc}
        onClickDecertifyUserFunc={this.onClickDecertifyUserFunc}
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
  allowCertifyUser: PropTypes.bool,
  jobId: PropTypes.string,
};

ListContainer.defaultProps = {
  allowChangeCollaborationState: undefined,
  allowCertifyUser: undefined,
  match: undefined,
  invited: undefined,
  users: [],
  jobId: undefined,
};

export default ListContainer;
