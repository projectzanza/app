import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Panel from '../../components/Panel/container';
import UserController from '../../modules/user/controller';
import JobController from '../../modules/jobs/controller';
import ShowJob from '../../modules/jobs/Show/container';
import UserList from '../../modules/user/List/container';
import ListScope from '../../modules/scopes/List/container';
import CreateScope from '../../modules/scopes/Create/container';
import EstimateList from '../../modules/estimates/List/container';
import CreateEstimate from '../../modules/estimates/Create/container';
import RocketChat from '../../modules/rocketchat/chat/container';
import routes from '../routes';

class JobShowScene extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      user: UserController.currentUser(this.store),
      job: JobController.getJob(this.store, props.params.id),
      matchingUsers: [],
      mode: this.props.params.mode,
    };
    this.onClickUser = this.onClickUser.bind(this);
    this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
    this.onModeChange = this.onModeChange.bind(this);
    this.filterMatchingUser = this.filterMatchingUser.bind(this);
    this.filterCollaboratingUser = this.filterCollaboratingUser.bind(this);
  }

  componentDidMount() {
    this.fetchData();

    this.unsubscribe = this.store.subscribe(() => {
      this.setState({ job: JobController.getJob(this.store, this.props.params.id) });
      if (this.state.job) {
        this.setState({
          matchingUsers: UserController.sortByCollaborationState(
            this.state.job.matchingUsers(this.store),
          ),
          collaboratingUsers: this.state.job.collaboratingUsers(this.store),
          acceptedUser: this.state.job.acceptedUsers(this.store)[0],
        });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ mode: nextProps.params.mode });
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
    UserController.fetchCollaboratingUsersForJob(this.store, this.state.job.id);
  }

  onModeChange(mode) {
    this.setState({ mode });
  }

  fetchData() {
    JobController.fetchJob(this.store, this.props.params.id).then(() => {
      UserController.fetchUser(this.store, this.state.user.id, this.props.params.id);
    });
    this.filterCollaboratingUser();
    this.filterMatchingUser();
  }

  userOwnsJob() {
    return this.state.job && this.state.job.user_id === this.state.user.id;
  }

  inViewMode() {
    return this.state.mode !== 'edit';
  }

  filterMatchingUser(filterText) {
    UserController.fetchMatchingUsersForJob(
      this.store,
      this.props.params.id,
      filterText,
    );
  }

  filterCollaboratingUser(filterText) {
    UserController.fetchCollaboratingUsersForJob(
      this.store,
      this.props.params.id,
      filterText,
    );
  }

  collaboratingUserList() {
    if (this.userOwnsJob() && this.inViewMode()) {
      return (
        <Panel title="Collaborating Users" filter={this.filterCollaboratingUser}>
          <UserList
            jobId={this.props.params.id}
            users={this.state.collaboratingUsers}
            onClickUser={this.onClickUser}
            allowChangeCollaborationState
          />
        </Panel>
      );
    }
    return null;
  }


  matchingUserList() {
    if (this.userOwnsJob() && this.inViewMode()) {
      return (
        <Panel title="Matching Consultants" filter={this.filterMatchingUser}>
          <UserList
            jobId={this.props.params.id}
            users={this.state.matchingUsers}
            onClickUser={this.onClickUser}
            allowChangeCollaborationState
          />
        </Panel>
      );
    }
    return null;
  }

  scopes() {
    if (this.state.job) {
      return (
        <Panel title="Scope">
          <ListScope
            job={this.state.job}
            currentUser={this.state.user}
            acceptedUser={this.state.acceptedUser}
          />
          <CreateScope job={this.state.job} />
        </Panel>
      );
    }
    return null;
  }

  estimates() {
    if (this.state.job && !this.userOwnsJob()) {
      return (
        <Panel title="Estimates">
          <EstimateList
            userId={this.state.user.id}
            job={this.state.job}
            estimates={this.state.job.estimates(this.store, this.state.user.id)}
          />

          <CreateEstimate jobId={this.state.job.id} />
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
          mode={this.state.mode}
          currentUser={this.state.user}
          onSubmitSuccess={this.onSubmitSuccess}
          onModeChange={this.onModeChange}
        />

        {this.scopes()}
        {this.estimates()}

        {this.collaboratingUserList()}
        {this.matchingUserList()}

        <RocketChat />
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

