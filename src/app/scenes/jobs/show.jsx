import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Panel } from 'react-bootstrap';
import UserController from '../../modules/user/controller';
import JobController from '../../modules/jobs/controller';
import ShowJob from '../../modules/jobs/Show/container';
import UserList from '../../modules/user/List/container';
import routes from '../routes';

class JobShowScene extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      user: UserController.currentUser(this.store),
      job: JobController.getJob(this.store, props.params.id),
      matchingUsers: [],
      invitedUsers: [],
      interestedUsers: [],
      awardedUsers: [],
    };
    this.onClickUser = this.onClickUser.bind(this);
  }

  componentWillMount() {
    JobController.fetchJob(this.store, this.props.params.id).then(() => {
      UserController.fetchUser(this.store, this.state.user.id, this.props.params.id);
    });
    UserController.fetchMatchingUsersForJob(this.store, this.props.params.id);
    UserController.fetchInvitedUsersForJob(this.store, this.props.params.id);
    UserController.fetchInterestedUsersForJob(this.store, this.props.params.id);
    UserController.fetchAwardedUsersForJob(this.store, this.props.params.id);
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      this.setState({ job: JobController.getJob(this.store, this.props.params.id) });
      if (this.state && this.state.job) {
        const awardedUser = this.state.job.awardedUser(this.store);
        this.setState({
          matchingUsers: this.state.job.matchingUsers(this.store),
          invitedUsers: this.state.job.invitedUsers(this.store),
          interestedUsers: this.state.job.interestedUsers(this.store),
          awardedUsers: awardedUser ? [awardedUser] : [],
        });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onClickUser(ev, user) {
    ev.preventDefault();
    browserHistory.push(routes.job.user(this.state.job.id, user.id));
  }

  matchingUserList() {
    if (this.state.job && this.state.job.user_id === this.state.user.id) {
      return (
        <Panel header={<h3>Matching Consultants</h3>}>
          <UserList
            jobId={this.state.job.id}
            users={this.state.matchingUsers}
            onClickUser={this.onClickUser}
            allowInviteUser
          />
        </Panel>
      );
    }
    return null;
  }

  invitedUserList() {
    if (this.state.job && this.state.job.user_id === this.state.user.id) {
      return (
        <Panel header={<h3>Invited Consultants</h3>}>
          <UserList
            jobId={this.state.job.id}
            users={this.state.invitedUsers}
            onClickUser={this.onClickUser}
            allowAwardUser
          />
        </Panel>
      );
    }
    return null;
  }

  awardedUserList() {
    if (this.state.job && this.state.job.user_id === this.state.user.id) {
      return (
        <Panel header={<h3>Awarded Consultant</h3>}>
          <UserList
            jobId={this.state.job.id}
            users={this.state.awardedUsers}
            onClickUser={this.onClickUser}
          />
        </Panel>
      );
    }
    return null;
  }

  interestedUserList() {
    if (this.state.job && this.state.job.user_id === this.state.user.id) {
      return (
        <Panel header={<h3> Interested Consultants</h3>}>
          <UserList
            jobId={this.state.jobId}
            users={this.state.interestedUsers}
            onClickUser={this.onClickUser}
            allowAwardUser
          />
        </Panel>
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        <ShowJob
          job={this.state.job}
          mode={this.props.params.mode}
          currentUser={this.state.user}
        />
        {this.awardedUserList()}
        {this.invitedUserList()}
        {this.interestedUserList()}
        {this.matchingUserList()}
      </div>
    );
  }
}

JobShowScene.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
    mode: PropTypes.string,
  }).isRequired,
};

JobShowScene.contextTypes = {
  store: PropTypes.object,
};

export default JobShowScene;

