import { singleItem } from '../../lib/store/utils';
import { getJob } from './actions';

class JobController {

  static fetchJob(store, id) {
    return new Promise((resolve) => {
      const job = singleItem(store, 'jobs', id);
      if (job) {
        resolve(job);
      } else {
        store.dispatch(getJob(id)).then(() => {
          resolve(singleItem(store, 'jobs', id));
        });
      }
    });
  }

  static getJob(store, id) {
    return singleItem(store, 'jobs', id);
  }
}

export default JobController;
