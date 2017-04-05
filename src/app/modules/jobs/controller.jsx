import React from 'react';
import { browserHistory } from 'react-router';
import QuickCreateJobContainer from './QuickCreate/container';
import ShowJobContainer from './Show/container';
import ShowJobListContainer from './List/container';

class JobController {

  static onQuickCreateSuccess(job) {
    browserHistory.push(`/job/${job.id}/edit`);
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

  static onClickJob(ev, job) {
    ev.preventDefault();
    browserHistory.push(`/job/${job.id}`);
  }

  static showListScene(props) {
    return (
      <ShowJobListContainer
        {...props}
        onClickJob={JobController.onClickJob}
      />
    );
  }
}

export default JobController;
