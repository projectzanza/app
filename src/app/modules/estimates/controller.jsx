import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import ModalEditEstimate from './EditModal/container';
import ConfirmModal from '../../components/ConfirmModal/confirm';
import * as actions from './actions';
import Estimate from './model';

class EstimateController {
  static submitEstimate(store, jobId, estimate) {
    return store.dispatch(actions.submitEstimate(jobId, estimate));
  }

  static acceptEstimate(store, estimate) {
    return store.dispatch(actions.acceptEstimate(estimate));
  }

  static rejectEstimate(store, estimate) {
    return store.dispatch(actions.rejectEstimate(estimate));
  }

  static editEstimate(store, estimate) {
    ReactDOM.render(
      <ReduxProvider store={store}>
        <ModalEditEstimate
          jobId={estimate.job_id}
          estimate={estimate}
          show
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
          estimate={new Estimate()}
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
        show
      />,
      document.getElementById('modal'),
    );
  }
}

export default EstimateController;
