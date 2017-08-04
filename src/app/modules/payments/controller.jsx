import React from 'react';
import ReactDOM from 'react-dom';
import { StripeProvider } from 'react-stripe-elements';
import ModalCompletePaymentDetails from './ModalCompletePaymentDetails/container';
import Config from '../../config/app';
import * as actions from './actions';

class PaymentController {

  static requirePaymentDetails() {
    return true;
  }

  static completePaymentDetails(props) {
    ReactDOM.render(
      <StripeProvider apiKey={Config.stripe.token}>
        <ModalCompletePaymentDetails
          store={props.store}
          jobId={props.jobId}
          onComplete={props.onComplete}
        />
      </StripeProvider>,
      document.getElementById('modal'),
    );
  }

  static storeToken(store, token, estimateId) {
    return store.dispatch(actions.postToken(token, estimateId));
  }

  static completePayment(store, jobId) {
    return store.dispatch(actions.postCompletePayment(jobId));
  }
}

export default PaymentController;
