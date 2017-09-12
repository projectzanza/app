import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Panel from '../../components/Panel/container';
import ShowUser from '../../modules/user/Profile/container';
import JobController from '../../modules/jobs/controller';
import UserController from '../../modules/user/controller';
import ReviewController from '../../modules/reviews/controller';
import Job from '../../modules/jobs/model';
import User from '../../modules/user/model';
import EstimateList from '../../modules/estimates/List/container';
import PositionList from '../../modules/positions/List/container';
import CreatePosition from '../../modules/positions/Create/container';
import ReviewList from '../../modules/reviews/List/container';

class UserShowScene extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {};
  }

  componentDidMount() {
    Promise.all(this.fetchData()).then(() => {
      this.updateState();
      this.subscribe();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  fetchData() {
    const promises = [
      UserController.fetchUser(this.store, this.props.params.id, _.get(this.props.params, 'jobId')),
      ReviewController.fetchReviews(this.store, 'users', this.props.params.id),
    ];

    if (this.props.params.jobId) {
      promises.concat(JobController.fetchJob(this.store, this.props.params.jobId));
    }
    return promises;
  }

  updateState() {
    const user = User.find(this.store, this.props.params.id);
    const state = {
      user,
      reviews: user.reviews(this.store),
    };

    if (this.props.params.jobId) {
      state.job = Job.find(this.store, this.props.params.jobId);
    }
    this.setState(state);
  }

  subscribe() {
    this.unsubscribe = this.store.subscribe(() => {
      this.updateState();
    });
  }

  estimateList() {
    if (this.state.job) {
      return (
        <Panel title="estimates">
          <EstimateList
            estimates={this.state.job.estimates(this.store, this.state.user.id)}
            job={this.state.job}
          />
        </Panel>
      );
    }
    return null;
  }

  positionList() {
    return (
      <Panel title="Positions">
        <PositionList
          user={this.state.user}
        />
        { this.state.user.id === UserController.currentUser(this.store).id &&
          <CreatePosition userId={this.state.user.id} />
        }
      </Panel>
    );
  }

  reviewList() {
    return (
      <Panel title="Reviews">
        <ReviewList reviews={this.state.reviews} />
      </Panel>
    );
  }

  render() {
    // // job needs to be loaded before showing the ShowUser
    if (this.state.user &&
      (!this.props.params.jobId || (this.props.params.jobId && this.state.job))) {
      return (
        <div>
          <ShowUser
            job={this.state.job}
            user={this.state.user}
            mode={this.props.params.mode}
          />
          { this.estimateList() }
          { this.reviewList() }
          { this.positionList() }
        </div>
      );
    }
    return null;
  }
}

UserShowScene.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
    mode: PropTypes.string,
    jobId: PropTypes.string,
  }).isRequired,
};

UserShowScene.contextTypes = {
  store: PropTypes.object,
};

export default UserShowScene;
