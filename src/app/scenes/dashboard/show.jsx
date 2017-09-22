import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import routes from '../routes';
import UserController from '../../modules/user/controller';
import JobController from '../../modules/jobs/controller';
import JobQuickCreate from '../../modules/jobs/QuickCreate/container';
import JobList from '../../modules/jobs/List/container';
import DashboardContainer from '../../modules/dashboard/Dashboard/container';

class DashboardScene extends React.Component {

  static onQuickCreateSuccess(job) {
    browserHistory.push(routes.job.edit(job.id));
  }

  static onClickJob(ev, job) {
    ev.preventDefault();
    browserHistory.push(routes.job.show(job.id));
  }

  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      user: UserController.currentUser(this.store),
      userJobs: [],
      invitedToJobs: [],
      matchingJobs: [],
      interestedInJobs: [],
      awardedJobs: [],
    };
  }

  componentDidMount() {
    Promise.all(this.fetchJobs()).then(() => {
      this.updateState();
      this.unsubscribe = this.store.subscribe(() => {
        this.updateState();
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }


  updateState() {
    const user = this.state.user;
    this.setState({
      userJobs: user.jobs(this.store),
      matchingJobs: JobController.sortByCollaborationState(
        user.collaboratingJobs(this.store),
        user.matchingJobs(this.store),
      ),
    });
  }

  fetchJobs() {
    return [
      JobController.fetchUserJobs(this.store, this.state.user.id),
      JobController.fetchCollaboratingJobs(this.store, this.state.user.id),
      JobController.fetchMatchingJobsForUser(this.store, this.state.user.id),
    ];
  }

  render() {
    return (
      <DashboardContainer>
        <Panel header={<h3>Quick Create Job</h3>}>
          <JobQuickCreate
            onSubmitSuccess={DashboardScene.onQuickCreateSuccess}
          />
        </Panel>

        <Panel header={<h3>Your Jobs</h3>}>
          <JobList
            userId={UserController.currentUser(this.store).id}
            onClickJob={DashboardScene.onClickJob}
            jobs={this.state.userJobs}
          />
        </Panel>

        <Panel header={<h3>Matching Jobs</h3>}>
          <JobList
            userId={UserController.currentUser(this.store).id}
            onClickJob={DashboardScene.onClickJob}
            jobs={this.state.matchingJobs}
          />
        </Panel>
      </DashboardContainer>
    );
  }
}

DashboardScene.contextTypes = {
  store: PropTypes.object,
};

export default DashboardScene;
