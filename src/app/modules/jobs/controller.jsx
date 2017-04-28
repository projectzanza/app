import { getJob } from './actions';
import Job from './model';

class JobController {

  static fetchJob(store, id) {
    return store.dispatch(getJob(id));
  }

  static getJob(store, id) {
    return Job.find(store, id);
  }
}

export default JobController;
