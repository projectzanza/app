import React from 'react';
import { Panel } from 'react-bootstrap';
import DashboardContainer from './components/Dashboard/container';
import JobController from '../job/controller';
import JobsController from '../jobs/controller';

class DashboardController {

  static scene() {
    return (
      <DashboardContainer>
        <Panel header={<h3>Quick Create Job</h3>}>
          {JobController.quickCreateScene()}
        </Panel>

        <Panel header={<h3>Your Jobs</h3>}>
          {JobsController.showListScene()}
        </Panel>
      </DashboardContainer>
    );
  }
}
export default DashboardController;
