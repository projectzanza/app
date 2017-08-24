import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import ModalEditEstimate from './EditModal/container';
import ConfirmModal from '../../components/ConfirmModal/confirm';
import * as actions from './actions';

class EstimateController {
  static submitEstimate(store, jobId, estimate) {
    return store.dispatch(actions.submitEstimate(jobId, estimate));
  }

  static editEstimate(store, estimate) {
    ReactDOM.render(
      <ReduxProvider store={store}>
        <ModalEditEstimate
          jobId={estimate.job_id}
          estimate={estimate}
        />
      </ReduxProvider>,
      document.getElementById('modal'),
    );
  }

  static createEstimate(store, jobId) {
    ReactDOM.render(
      <ReduxProvider store={store}>
        <ModalEditEstimate
          jobId={jobId}
          show
        />
      </ReduxProvider>,
      document.getElementById('modal'),
    );
  }

  static deleteEstimate(store, estimate) {
    ReactDOM.render(
      <ConfirmModal
        title="Confirm delete estimate"
        body="Deleting this estiamte cannot be undone"
        onConfirm={() => store.dispatch(actions.deleteEstimate(estimate))}
      />,
      document.getElementById('modal'),
    );
  }
}

export default EstimateController;
