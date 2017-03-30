import React from 'react';
import { browserHistory } from 'react-router';
import QuickCreateJobContainer from './QuickCreate/container';
import EditJobContainer from './Edit/container';

class JobController {

  static onQuickCreateSuccess(jobId) {
    browserHistory.push(`/job/${jobId}`);
  }

  static quickCreateScene() {
    return (
      <QuickCreateJobContainer onSubmitSuccess={JobController.onQuickCreateSuccess} />
    );
  }

  static updateSuccess() {
    console.log('success');
  }

  static editScene(props) {
    return (
      <EditJobContainer
        {...props}
        onUpdateSuccess={JobController.updateSuccess}
      />
    );
  }
}

export default JobController;
