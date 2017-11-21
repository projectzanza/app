import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import Review from '../model';
import Form from './components/form';
import ReviewController from '../controller';

class EditContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      show: props.show,
      review: props.review,
    };

    this.onHide = this.onHide.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.review) {
      this.setState({ review: nextProps.review });
    }
    this.setState({ show: nextProps.show });
  }

  onSubmit(ev, review) {
    ev.preventDefault();
    ReviewController.submitReview(this.store, review)
      .then(() => {
        this.onHide();
      });
  }

  onCancel() {
    this.onHide();
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
          <Modal.Title>Write a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            review={this.state.review}
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
          />
        </Modal.Body>
      </Modal>
    );
  }
}

EditContainer.propTypes = {
  review: Review.propTypes.isRequired,
  show: PropTypes.bool.isRequired,
};

EditContainer.contextTypes = {
  store: PropTypes.object,
};

export default EditContainer;
