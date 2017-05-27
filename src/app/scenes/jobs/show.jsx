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
    };
    this.onClickUser = this.onClickUser.bind(this);
    this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
  }

  componentDidMount() {
    this.fetchData();

    this.unsubscribe = this.store.subscribe(() => {
      this.setState({ job: JobController.getJob(this.store, this.props.params.id) });
      if (this.state.job) {
        this.setState({
          matchingUsers: UserController.sortByCollaborationState(
            this.state.job.matchingUsers(this.store),
            this.state.job.collaboratingUsers(this.store),
          ),
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

  onSubmitSuccess() {
    browserHistory.replace(routes.job.show(this.state.job.id));
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
            allowChangeCollaborationState
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
          onSubmitSuccess={this.onSubmitSuccess}
        />

        {this.scope()}
        {this.estimate()}

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

