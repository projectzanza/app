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

  static getJob(store, id) {
    return Job.find(store, id);
  }


}

export default JobController;
