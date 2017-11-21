import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import Form from './components/form';
import Position from '../model';
import PositionController from '../controller';

class EditModalContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      show: props.show,
      position: props.position,
    };

    this.onHide = this.onHide.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      position: nextProps.position,
      show: nextProps.show,
    });
  }

  onCancel() {
    this.setState({ position: new Position() });
    this.onHide();
  }

  onSubmit(ev, form) {
    ev.preventDefault();
    PositionController.submitPosition(this.store, this.props.userId, form)
      .then(() => {
        this.setState({ position: new Position() });
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
          <Modal.Title>Edit Position</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            position={this.state.position}
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
          />
        </Modal.Body>
      </Modal>
    );
  }
}

EditModalContainer.propTypes = {
  userId: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  position: Position.propTypes.isRequired,
};

EditModalContainer.contextTypes = {
  store: PropTypes.object,
};

export default EditModalContainer;
