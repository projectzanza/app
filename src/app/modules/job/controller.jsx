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

  static updateSuccess(job) {
    browserHistory.push(`/job/${job.id}`);
  }

  static onCancelEdit(job) {
    browserHistory.push(`/job/${job.id}`);
  }

  static onEdit(job) {
    browserHistory.push(`/job/${job.id}/edit`);
  }

  static showScene(props) {
    return (
      <ShowJobContainer
        {...props}
        onUpdateSuccess={JobController.updateSuccess}
        onCancelEdit={JobController.onCancelEdit}
        onEdit={JobController.onEdit}
      />
    );
  }
}

export default JobController;
