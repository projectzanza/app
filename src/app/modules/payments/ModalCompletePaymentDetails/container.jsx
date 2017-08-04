import React from 'react';
import PropTypes from 'prop-types';
import { Elements } from 'react-stripe-elements';
import { Modal } from 'react-bootstrap';
import PaymentsController from '../controller';
import PaymentForm from './form';

class ModalCompletePaymentDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      submit: false,
    };
    this.onHide = this.onHide.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onHide() {
    this.setState({ show: false });
  }

  onSubmit(ev, stripe) {
    ev.preventDefault();
    stripe.createToken(ev.data).then((response) => {
      if (response.error) {
      } else if (response.token) {
        PaymentsController.storeToken(
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

  render() {
    return (
      <Modal
        show={this.state.show}
        onHide={this.onHide}
      >
        <Modal.Header>
          <Modal.Title>Add Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Elements>
            <PaymentForm
              onHide={this.onHide}
              onSubmit={this.onSubmit}
            />
          </Elements>
        </Modal.Body>
      </Modal>
    );
  }
}

ModalCompletePaymentDetails.propTypes = {
  store: PropTypes.object.isRequired,    // eslint-disable-line react/forbid-prop-types
  jobId: PropTypes.string.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default ModalCompletePaymentDetails;
