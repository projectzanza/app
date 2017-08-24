import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

class ConfirmModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = { show: true };
    this.onHide = this.onHide.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
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
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {this.props.body}
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

ConfirmModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default ConfirmModal;
