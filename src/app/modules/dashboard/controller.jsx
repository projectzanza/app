import React from 'react';
import DashboardContainer from './components/Dashboard/container';
import QuickCreatePanel from './components/QuickCreatePanel/container';
import JobController from '../job/controller';

class DashboardController {

  static scene() {
    return (
      <DashboardContainer>
        <QuickCreatePanel>
          {JobController.quickCreateScene()}
        </QuickCreatePanel>
      </DashboardContainer>
    );
  }
}
export default DashboardController;
