import * as actions from './actions';

class ScopeController {
  static fetchScopes(store, jobId) {
    return store.dispatch(actions.getScopes(jobId));
  }

  static createScope(store, jobId, scope) {
    return store.dispatch(actions.createScope(jobId, scope));
  }
}

export default ScopeController;
