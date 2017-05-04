import * as actions from './actions';

class ScopeController {
  static fetchScopes(store, jobId) {
    return store.dispatch(actions.getScopes(jobId));
  }
}

export default ScopeController;
