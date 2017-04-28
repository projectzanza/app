import React from 'react';
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
    this.user = UserController.currentUser(this.store);
    this.state = {
      userJobs: [],
      invitedToJobs: [],
      matchingJobs: [],
    };
  }

  componentWillMount() {
    JobController.fetchUserJobs(this.store, this.user.id);
    JobController.fetchInvitedJobsForUser(this.store, this.user.id);
    JobController.fetchMatchingJobsForUser(this.store, this.user.id);
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      this.setState({
        userJobs: this.user.jobs(this.store),
        matchingJobs: this.user.matchingJobs(this.store),
        invitedToJobs: this.user.invitedToJobs(this.store),
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
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

        <Panel header={<h3>Your Invites</h3>}>
          <JobList
            userId={UserController.currentUser(this.store).id}
            onClickJob={DashboardScene.onClickJob}
            jobs={this.state.invitedToJobs}
          />
        </Panel>

        <Panel header={<h3>Available Jobs</h3>}>
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
  store: React.PropTypes.object,
};

export default DashboardScene;
