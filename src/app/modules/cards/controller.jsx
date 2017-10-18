import React from 'react';
import ReactDOM from 'react-dom';
import { StripeProvider } from 'react-stripe-elements';
import Config from 'Config';
import ModalCompletePaymentDetails from './ModalCompletePaymentDetails/container';
import * as actions from './actions';

class PaymentController {

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

  static storeToken(store, tokenId, jobId) {
    return store.dispatch(actions.postToken(
      { token: tokenId },
      jobId,
    ));
  }

  static useCard(store, cardId, jobId) {
    return store.dispatch(actions.postToken(
      { card: cardId },
      jobId,
    ));
  }

  static fetchCards(store) {
    store.dispatch(actions.getCards());
  }
}

export default PaymentController;
