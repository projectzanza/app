import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import Panel from '../../components/Panel/container';
import UserController from '../../modules/user/controller';
import JobController from '../../modules/jobs/controller';
import Job from '../../modules/jobs/model';
import ShowJob from '../../modules/jobs/Show/container';
import ConsultantFilter from '../../modules/jobs/ConsultantFilter/container';
import ReviewController from '../../modules/reviews/controller';
import UserList from '../../modules/user/List/container';
import ListScope from '../../modules/scopes/List/container';
import CreateScope from '../../modules/scopes/Create/container';
import EstimateList from '../../modules/estimates/List/container';
import CreateEstimate from '../../modules/estimates/Create/container';
import CreateReview from '../../modules/reviews/Create/container';
import ReviewList from '../../modules/reviews/List/container';
import routes from '../routes';

class JobShowScene extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      user: UserController.currentUser(this.store),
      job: JobController.getJob(this.store, props.params.id),
      matchingUsers: [],
      acceptedUser: undefined,
      mode: this.props.params.mode,
      collaboratingUsers: [],
      reviews: [],
    };
    this.onClickUser = this.onClickUser.bind(this);
    this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
    this.onModeChange = this.onModeChange.bind(this);
    this.filterMatchingUser = this.filterMatchingUser.bind(this);
    this.filterCollaboratingUser = this.filterCollaboratingUser.bind(this);
  }

  componentDidMount() {
    Promise.all(this.fetchData()).then(() => {
      this.subscribe();
      this.updateState();
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ mode: nextProps.params.mode });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
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
        <div>
          <Panel title="Matching Consultants">
            <Grid fluid>
              <Row className="show-grid">
                <Col md={2}>
                  <ConsultantFilter
                    jobId={this.props.params.id}
                    consultantFilter={this.state.job.consultant_filter}
                    onSubmitSuccess={filters =>
                      UserController.fetchMatchingUsersForJob(
                        this.store,
                        this.props.params.id,
                        filters,
                      )
                    }
                  />
                </Col>
                <Col md={10}>
                  <UserList
                    jobId={this.props.params.id}
                    users={this.state.matchingUsers}
                    onClickUser={this.onClickUser}
                    allowChangeCollaborationState
                  />
                </Col>
              </Row>
            </Grid>
          </Panel>
        </div>
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
        {this.state.job &&
          <ShowJob
            job={this.state.job}
            mode={this.state.mode}
            currentUser={this.state.user}
            onSubmitSuccess={this.onSubmitSuccess}
            onModeChange={this.onModeChange}
          />
        }
        <br />
        <Button onClick={() => window.open('/chat')}> Open RocketChat </Button>
        <br />

        {this.scopes()}
        {this.estimates()}
        {this.reviews()}

        {this.collaboratingUserList()}
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

