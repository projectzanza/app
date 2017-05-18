import * as actions from './actions';

class EstimateController {
  static submitEstimate(store, jobId, userId, estimate) {
    return store.dispatch(actions.submitEstimate(jobId, userId, estimate));
  }
}

export default EstimateController;
