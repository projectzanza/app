import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Panel from '../../components/Panel/container';
import UserController from '../../modules/user/controller';
import JobController from '../../modules/jobs/controller';
import Job from '../../modules/jobs/model';
import ReviewController from '../../modules/reviews/controller';
import ShowJob from '../../modules/jobs/Show/container';
import UserList from '../../modules/user/List/container';
import ListScope from '../../modules/scopes/List/container';
import CreateScope from '../../modules/scopes/Create/container';
import EstimateList from '../../modules/estimates/List/container';
import CreateEstimate from '../../modules/estimates/Create/container';
import CreateReview from '../../modules/reviews/Create/container';
import ReviewList from '../../modules/reviews/List/container';
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
      collaboratingUsers: [],
      reviews: [],
      estimates: [],
    };
    this.onClickUser = this.onClickUser.bind(this);
    this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
    this.onModeChange = this.onModeChange.bind(this);
    this.filterMatchingUser = this.filterMatchingUser.bind(this);
    this.filterCollaboratingUser = this.filterCollaboratingUser.bind(this);
  }

  componentDidMount() {
    Promise.all(this.fetchData()).then(() => {
      this.updateState();
      this.subscribe();
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

  updateState() {
    const job = Job.find(this.store, this.props.params.id);
    this.setState({
      job,
      matchingUsers: UserController.sortByCollaborationState(job.matchingUsers(this.store)),
      collaboratingUsers: job.collaboratingUsers(this.store),
      acceptedUser: job.acceptedUser(this.store),
      reviews: job.reviews(this.store),
      estimates: job.estimates(this.store, this.state.user.id),
    });
  }

  subscribe() {
    this.unsubscribe = this.store.subscribe(() => {
      this.updateState();
    });
  }

  fetchData() {
    return [
      JobController.fetchJob(this.store, this.props.params.id),
      UserController.fetchUser(this.store, this.state.user.id, this.props.params.id),
      ReviewController.fetchReviews(this.store, 'jobs', this.props.params.id),
      this.filterCollaboratingUser(),
      this.filterMatchingUser(),
    ];
  }

  userOwnsJob() {
    return this.state.job && this.state.job.user_id === this.state.user.id;
  }

  inViewMode() {
    return this.state.mode !== 'edit';
  }

  filterMatchingUser(filterText) {
    return UserController.fetchMatchingUsersForJob(
      this.store,
      this.props.params.id,
      filterText,
    );
  }

  filterCollaboratingUser(filterText) {
    return UserController.fetchCollaboratingUsersForJob(
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

  reviews() {
    if (this.state.job && this.state.acceptedUser) {
      return (
        <Panel title="Reviews">

          <ReviewList
            reviews={this.state.reviews}
          />

          <CreateReview
            job={this.state.job}
            subjectId={ReviewController.subjectId(
              this.state.job,
              this.state.user,
              this.state.acceptedUser,
            )}
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
          mode={this.state.mode}
          currentUser={this.state.user}
          onSubmitSuccess={this.onSubmitSuccess}
          onModeChange={this.onModeChange}
        />

        {this.scopes()}
        {this.estimates()}
        {this.reviews()}

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

