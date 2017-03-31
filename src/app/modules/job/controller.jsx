import React from 'react';
import { browserHistory } from 'react-router';
import QuickCreateJobContainer from './QuickCreate/container';
import ShowJobContainer from './Show/container';

class JobController {

  static onQuickCreateSuccess(jobId) {
    browserHistory.push(`/job/${jobId}/edit`);
  }

  static quickCreateScene() {
    return (
      <QuickCreateJobContainer onSubmitSuccess={JobController.onQuickCreateSuccess} />
    );
  }

  static updateSuccess() {
    console.log('success');
  }

  static showScene(props) {
    return (
      <ShowJobContainer
        {...props}
        onUpdateSuccess={JobController.updateSuccess}
      />
    );
  }
}

export default JobController;
