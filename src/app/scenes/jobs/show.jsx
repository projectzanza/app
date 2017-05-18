import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Panel } from 'react-bootstrap';
import UserController from '../../modules/user/controller';
import JobController from '../../modules/jobs/controller';
import ShowJob from '../../modules/jobs/Show/container';
import UserList from '../../modules/user/List/container';
import ListScope from '../../modules/scopes/List/container';
import CreateScope from '../../modules/scopes/Create/container';
import EstimateContainer from '../../modules/estimates/Show/container';
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

  componentDidMount() {
    this.fetchData();

    this.unsubscribe = this.store.subscribe(() => {
      this.setState({ job: JobController.getJob(this.store, this.props.params.id) });
      if (this.state.job) {
        this.setState({
          matchingUsers: this.state.job.matchingUsers(this.store),
          invitedUsers: this.state.job.invitedUsers(this.store)
            .concat(this.state.job.prospectiveUsers(this.store)),
          interestedUsers: this.state.job.interestedUsers(this.store),
          awardedUsers: this.state.job.awardedUsers(this.store)
            .concat(this.state.job.participatingUsers(this.store)),
          participatingUser: this.state.job.participatingUsers(this.store)[0],
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

  fetchData() {
    JobController.fetchJob(this.store, this.props.params.id).then(() => {
      UserController.fetchUser(this.store, this.state.user.id, this.props.params.id);
    });
    UserController.fetchCollaboratingUsersForJob(this.store, this.props.params.id);
    UserController.fetchMatchingUsersForJob(this.store, this.props.params.id);
  }

  userOwnsJob() {
    return this.state.job && this.state.job.user_id === this.state.user.id;
  }

  matchingUserList() {
    if (this.userOwnsJob()) {
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
    if (this.userOwnsJob()) {
      return (
        <Panel header={<h3>Invited Consultants</h3>}>
          <UserList
            jobId={this.state.job.id}
            users={this.state.invitedUsers}
            onClickUser={this.onClickUser}
            allowAwardUser
            allowRejectUser
          />
        </Panel>
      );
    }
    return null;
  }

  awardedUserList() {
    if (this.userOwnsJob()) {
      return (
        <Panel header={<h3>Awarded Consultant</h3>}>
          <UserList
            jobId={this.state.job.id}
            users={this.state.awardedUsers}
            onClickUser={this.onClickUser}
            allowRejectUser
          />
        </Panel>
      );
    }
    return null;
  }

  interestedUserList() {
    if (this.userOwnsJob()) {
      return (
        <Panel header={<h3>Interested Consultants</h3>}>
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

  scope() {
    if (this.state.job) {
      return (
        <Panel header={<h3>Scope</h3>}>
          <ListScope
            job={this.state.job}
            currentUser={this.state.user}
            participatingUser={this.state.participatingUser}
          />
          <CreateScope job={this.state.job} />
        </Panel>
      );
    }
    return null;
  }

  estimate() {
    if (this.state.job && !this.userOwnsJob()) {
      return (
        <Panel header={<h3>Estimate</h3>}>
          <EstimateContainer
            userId={this.state.user.id}
            jobId={this.state.job.id}
            estimate={this.state.job.estimate(this.store, this.state.user.id)}
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

        {this.scope()}
        {this.estimate()}

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

