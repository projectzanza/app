import React from 'react';
import PropTypes from 'prop-types';
import { Provider as ReduxProvider } from 'react-redux';
import { Elements } from 'react-stripe-elements';
import { Modal } from 'react-bootstrap';
import CardsController from '../controller';
import PaymentForm from './form';
import CardsView from '../List/container';

class ModalCompletePaymentDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      submit: false,
    };
    this.onHide = this.onHide.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCardSelect = this.onCardSelect.bind(this);
  }

  onHide() {
    this.setState({ show: false });
  }

  onSubmit(ev, stripe) {
    ev.preventDefault();
    stripe.createToken(ev.data).then((response) => {
      if (response.error) {
        // TODO: show error statement
      } else if (response.token) {
        CardsController.storeToken(
          this.props.store,
          response.token,
          this.props.jobId,
        )
          .then(() => {
            this.onHide();
            this.props.onComplete();
          });
      }
    });
  }

  onCardSelect(cardId) {
    CardsController.useCard(this.props.store, cardId, this.props.jobId)
      .then(() => {
        this.onHide();
        this.props.onComplete();
      });
  }

  render() {
    return (
      <ReduxProvider store={this.props.store}>
        <Modal
          show={this.state.show}
          onHide={this.onHide}
        >
          <Modal.Header>
            <Modal.Title>Add Payment Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CardsView
              onCardSelect={this.onCardSelect}
            />
            <Elements>
              <PaymentForm
                onHide={this.onHide}
                onSubmit={this.onSubmit}
              />
            </Elements>
          </Modal.Body>
        </Modal>
      </ReduxProvider>
    );
  }
}

ModalCompletePaymentDetails.propTypes = {
  store: PropTypes.object.isRequired,    // eslint-disable-line react/forbid-prop-types
  jobId: PropTypes.string.isRequired,
  onComplete: PropTypes.func.isRequired,
};

ModalCompletePaymentDetails.contextTypes = {
  store: PropTypes.object,
};

export default ModalCompletePaymentDetails;
