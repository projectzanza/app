import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import * as actions from './actions';
import ModalEditScope from './EditModal/container';
import Scope from './model';
import ConfirmModal from '../../components/ConfirmModal/confirm';

class ScopeController {
  static fetchScopes(store, jobId) {
    return store.dispatch(actions.getScopes(jobId));
  }

  static submitScope(store, jobId, scope) {
    return store.dispatch(actions.submitScope(jobId, scope));
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

  static deleteScope(store, jobId, scopeId) {
    ReactDOM.render(
      <ConfirmModal
        onConfirm={() => store.dispatch(actions.deleteScope(jobId, scopeId))}
        title="Confirm Deleting Scope"
        body="Deleting a scope will remove it from this job"
        show
      />,
      document.getElementById('modal'),
    );
  }

  static createScope(store, jobId) {
    ReactDOM.render(
      <ReduxProvider store={store}>
        <ModalEditScope
          jobId={jobId}
          scope={new Scope()}
          show
        />
      </ReduxProvider>,
      document.getElementById('modal'),
    );
  }

  static editScope(store, scope) {
    ReactDOM.render(
      <ReduxProvider store={store}>
        <ModalEditScope
          jobId={scope.job_id}
          scope={scope}
          show
        />
      </ReduxProvider>,
      document.getElementById('modal'),
    );
  }

}

export default ScopeController;
