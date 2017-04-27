import { getEntity } from '../../lib/store/utils';
import { getJob } from './actions';

class JobController {

  static fetchJob(store, id) {
    return new Promise((resolve) => {
      const job = getEntity(store, 'jobs', id);
      if (job) {
        resolve(job);
      } else {
        store.dispatch(getJob(id)).then(() => {
          resolve(getEntity(store, 'jobs', id));
        });
      }
    });
  }

  static getJob(store, id) {
    return getEntity(store, 'jobs', id);
  }
}

export default JobController;
