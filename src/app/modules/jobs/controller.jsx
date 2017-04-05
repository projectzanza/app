import React from 'react';
import { browserHistory } from 'react-router';
import ShowJobListContainer from './List/container';
import JobController from '../job/controller';

class JobsController {

  static onClickJob(ev, job) {
    ev.preventDefault();
    browserHistory.push(`/job/${job.id}`);
  }

  static showListScene(props) {
    return (
      <ShowJobListContainer
        {...props}
        onClickJob={JobsController.onClickJob}
      />
    );
  }
}

export default JobsController;
