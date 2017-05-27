import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

class ModalConfirmVerify extends React.Component {

  constructor(props) {
    super(props);
    this.state = { show: props.show };
    this.onHide = this.onHide.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ show: nextProps.show });
  }

  onHide() {
    this.setState({ show: false });
  }

  onConfirm() {
    this.onHide();
    this.props.onConfirm();
  }

  render() {
    return (
      <Modal
        show={this.state.show}
        onHide={this.onHide}
      >
        <Modal.Header>
          <Modal.Title>Confirm Complete Job</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          This will verify a job is complete
          Verify all scopes are complete
          Start the payment process
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.onHide}>Close</Button>
          <Button
            bsStyle="primary"
            onClick={this.onConfirm}
          >Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ModalConfirmVerify.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default ModalConfirmVerify;
