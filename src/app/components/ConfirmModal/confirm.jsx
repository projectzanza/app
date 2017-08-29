import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

class ConfirmModal extends React.Component {
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
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="linebreak">
          {this.props.body}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.onHide}>Cancel</Button>
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
  show: PropTypes.bool.isRequired,
};

export default ConfirmModal;
