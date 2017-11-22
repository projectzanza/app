import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import Form from './components/form';
import Estimate from '../model';
import EstimateController from '../controller';

class EditModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      show: props.show,
      estimate: props.estimate,
    };

    this.onHide = this.onHide.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      estimate: nextProps.estimate,
      show: nextProps.show,
    });
  }

  onClickCancel() {
    this.setState({ estimate: new Estimate() });
    this.onHide();
  }

  onSubmit(e, form) {
    e.preventDefault();
    EstimateController.submitEstimate(this.store, this.props.jobId, form)
      .then(() => {
        this.setState({ estimate: new Estimate() });
        this.onHide();
      });
  }

  onHide() {
    this.setState({ show: false });
  }

  render() {
    return (
      <Modal
        show={this.state.show}
        onHide={this.onHide}
      >
        <Modal.Header>
          <Modal.Title>Edit Estimate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            estimate={this.state.estimate}
            onSubmit={this.onSubmit}
            onClickCancel={this.onClickCancel}
          />
        </Modal.Body>
      </Modal>
    );
  }
}

EditModal.propTypes = {
  jobId: PropTypes.string.isRequired,
  estimate: Estimate.propTypes,
  show: PropTypes.bool.isRequired,
};

EditModal.defaultProps = {
  estimate: new Estimate(),
};

EditModal.contextTypes = {
  store: PropTypes.object,
};

export default EditModal;
