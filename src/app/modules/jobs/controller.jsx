import _ from 'lodash';
import * as actions from './actions';
import Job from './model';

class JobController {

  static fetchJob(store, id) {
    return store.dispatch(actions.getJob(id));
  }

  static fetchUserJobs(store, userId) {
    return store.dispatch(actions.getUserJobs({ userId }));
  }

  static fetchInvitedJobsForUser(store, userId) {
    return store.dispatch(actions.getInvitedJobsForUser({ userId }));
  }

  static fetchMatchingJobsForUser(store, userId) {
    return store.dispatch(actions.getMatchingJobsForUser({ userId }));
  }

  static fetchInterestedInJobsForUser(store, userId) {
    return store.dispatch(actions.getInterestedInJobsForUser({ userId }));
  }

  static fetchAwardedJobsForUser(store, userId) {
    return store.dispatch(actions.getAwardedJobsForUser({ userId }));
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

}

export default JobController;
