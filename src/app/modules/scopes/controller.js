import * as actions from './actions';

class ScopeController {
  static fetchScopes(store, jobId) {
    return store.dispatch(actions.getScopes(jobId));
  }

  static createScope(store, jobId, scope) {
    return store.dispatch(actions.createScope(jobId, scope));
  }

  static completeScope(store, jobId, scopeId) {
    return store.dispatch(actions.postStateScope(jobId, scopeId, 'complete'));
  }

  static verifyScope(store, jobId, scopeId) {
    return store.dispatch(actions.postStateScope(jobId, scopeId, 'verify'));
  }

  static rejectScope(store, jobId, scopeId) {
    return store.dispatch(actions.postStateScope(jobId, scopeId, 'reject'));
  }
}

export default ScopeController;
