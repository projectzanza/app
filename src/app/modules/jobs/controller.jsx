import _ from 'lodash';
import * as actions from './actions';
import Job from './model';
import ScopeController from '../scopes/controller';

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

  static verifyJobComplete(store, jobId) {
    return store.dispatch(actions.postVerifyJob({ jobId }));
  }

  static fetchScopes(store, jobId) {
    return ScopeController.fetchScopes(store, jobId);
  }

}

export default JobController;
