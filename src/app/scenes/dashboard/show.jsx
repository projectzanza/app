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
    this.user = UserController.currentUser(this.store);
    this.state = {
      userJobs: [],
      invitedToJobs: [],
      matchingJobs: [],
      interestedInJobs: [],
      awardedJobs: [],
    };
  }

  componentDidMount() {
    this.fetchJobs();

    this.unsubscribe = this.store.subscribe(() => {
      this.setState({
        userJobs: this.user.jobs(this.store),
        matchingJobs: this.user.matchingJobs(this.store),
        invitedToJobs: this.user.invitedToJobs(this.store),
        interestedInJobs: this.user.interestedInJobs(this.store),
        awardedJobs: this.user.awardedJobs(this.store),
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  fetchJobs() {
    JobController.fetchUserJobs(this.store, this.user.id);
    JobController.fetchCollaboratingJobs(this.store, this.user.id);
    JobController.fetchMatchingJobsForUser(this.store, this.user.id);
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

        <Panel header={<h3>Your Awarded Jobs</h3>}>
          <JobList
            userId={UserController.currentUser(this.store).id}
            onClickJob={DashboardScene.onClickJob}
            jobs={this.state.awardedJobs}
          />
        </Panel>

        <Panel header={<h3>Your Invites</h3>}>
          <JobList
            userId={UserController.currentUser(this.store).id}
            onClickJob={DashboardScene.onClickJob}
            jobs={this.state.invitedToJobs}
          />
        </Panel>

        <Panel header={<h3>Your Interesting Jobs</h3>}>
          <JobList
            userId={UserController.currentUser(this.store).id}
            onClickJob={DashboardScene.onClickJob}
            jobs={this.state.interestedInJobs}
          />
        </Panel>

        <Panel header={<h3>Available Jobs</h3>}>
          <JobList
            userId={UserController.currentUser(this.store).id}
            onClickJob={DashboardScene.onClickJob}
            jobs={this.state.matchingJobs}
            allowRegisterInterest
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
