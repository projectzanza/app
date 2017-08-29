import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import * as actions from './actions';
import Job from './model';
import ScopeController from '../scopes/controller';
import CardsController from '../cards/controller';
import ConfirmModal from '../../components/ConfirmModal/confirm';

class JobController {

  static fetchJob(store, id) {
    return store.dispatch(actions.getJob(id));
  }

  static fetchUserJobs(store, userId) {
    return store.dispatch(actions.getUserJobs({ userId }));
  }

  static fetchCollaboratingJobs(store, userId) {
    return store.dispatch(actions.getCollaboratingJobs({ userId }));
  }

  static fetchMatchingJobsForUser(store, userId) {
    return store.dispatch(actions.getMatchingJobsForUser({ userId }));
  }

  static getJob(store, id) {
    return Job.find(store, id);
  }

  static registerInterest(store, jobId, userId) {
    return store.dispatch(actions.postRegisterInterestInJob({ jobId, userId }));
  }

  static canAcceptJob(job) {
    return _.get(job, 'meta.current_user.collaboration_state') === 'awarded';
  }

  static acceptJob(store, jobId, userId) {
    return store.dispatch(actions.postAcceptJob({ jobId, userId }));
  }

  static canVerifyJobComplete(job, userId) {
    return !job.verified_at && job.user_id === userId;
  }

  static payForJob(store, jobId) {
    CardsController.completePaymentDetails({
      store,
      jobId,
      onComplete: () => {
        store.dispatch(actions.postVerifyJob({ jobId }))
          .then(() => JobController.fetchScopes(store, jobId));
      },
    });
  }

  static verifyJobComplete(store, jobId) {
    ReactDOM.render(
      <ConfirmModal
        title="Confirm Verify Job"
        body={'This will verify a job is complete \n ' +
        'Verify all scopes are complete \n ' +
        'Start the payment process'}
        onConfirm={JobController.payForJob(store, jobId)}
        show
      />,
      document.getElementById('modal'),
    );
  }

  static fetchScopes(store, jobId) {
    return ScopeController.fetchScopes(store, jobId);
  }

  static sortByCollaborationState(...args) {
    const items = [].reduce.call(args, (list, item) => list.concat(item), []);
    return _.uniq(_.sortBy(
      items,
      item => ['participating', 'awarded', 'invited', 'interested', undefined]
        .indexOf(_.get(item, 'meta.current_user.collaboration_state')),
    ));
  }

}

export default JobController;
