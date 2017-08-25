import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ShowUser from '../../modules/user/Profile/container';
import JobController from '../../modules/jobs/controller';
import UserController from '../../modules/user/controller';
import Job from '../../modules/jobs/model';
import User from '../../modules/user/model';
import EstimateList from '../../modules/estimates/List/container';

class UserShowScene extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {};
  }

  componentWillMount() {
    if (this.props.params.jobId) {
      JobController.fetchJob(this.store, this.props.params.jobId);
    }
    UserController.fetchUser(this.store, this.props.params.id, _.get(this.props.params, 'jobId'));
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      this.setState({
        user: User.find(this.store, this.props.params.id),
      });
      if (this.props.params.jobId) {
        this.setState({
          job: Job.find(this.store, this.props.params.jobId),
        });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  estimateList() {
    if (this.state.job) {
      return (
        <EstimateList
          estimates={this.state.job.estimates(this.store, this.state.user.id)}
          job={this.state.job}
        />
      );
    }
    return null;
  }

  render() {
    // // job needs to be loaded before showing the ShowUser
    if (!this.props.params.jobId || (this.props.params.jobId && this.state.job)) {
      return (
        <div>
          <ShowUser
            job={this.state.job}
            user={this.state.user}
            mode={this.props.params.mode}
          />
          { this.estimateList() }
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
