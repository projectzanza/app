import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import Form from './components/form';
import Scope from '../model';
import ScopeController from '../controller';

class EditModalContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      show: props.show,
      scope: props.scope,
    };

    this.onHide = this.onHide.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      scope: nextProps.scope,
      show: nextProps.show,
    });
  }

  onCancel() {
    this.setState({ scope: new Scope() });
    this.onHide();
  }

  onSubmit(ev, form) {
    ev.preventDefault();
    ScopeController.submitScope(this.store, this.props.jobId, form)
      .then(() => {
        this.setState({ scope: new Scope() });
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
          <Modal.Title>Edit Scope</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            scope={this.state.scope}
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
          />
        </Modal.Body>
      </Modal>
    );
  }
}

EditModalContainer.propTypes = {
  jobId: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  scope: Scope.propTypes,
};

EditModalContainer.defaultProps = {
  scope: new Scope(),
};

EditModalContainer.contextTypes = {
  store: PropTypes.object,
};

export default EditModalContainer;
