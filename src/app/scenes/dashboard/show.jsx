import React from 'react';
import { Panel } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import routes from '../routes';
import UserController from '../../modules/user/controller';
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
          />
        </Panel>

        <Panel header={<h3>Available Jobs</h3>}>
          <JobList
            userId={UserController.currentUser(this.store).id}
            onClickJob={DashboardScene.onClickJob}
            matching
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
