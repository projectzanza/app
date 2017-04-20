import React from 'react';
import { Panel } from 'react-bootstrap';
import DashboardContainer from './components/Dashboard/container';
import JobController from '../jobs/controller';

class DashboardController {

  static scene(router) {
    const { store } = router.route;

    return (
      <DashboardContainer>
        <Panel header={<h3>Quick Create Job</h3>}>
          {JobController.quickCreateScene()}
        </Panel>

        <Panel header={<h3>Your Jobs</h3>}>
          {JobController.showListScene({ userId: store.getState().user.currentUser })}
        </Panel>

        <Panel header={<h3>Available Jobs</h3>}>
          {JobController.showListScene({
            userId: store.getState().user.currentUser,
            matching: true,
          })}
        </Panel>
      </DashboardContainer>
    );
  }
}
export default DashboardController;
