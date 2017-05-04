import React from 'react';
import PropTypes from 'prop-types';
import Form from './components/form';
import Scope from '../model';
import ScopeController from '../controller';

class CreateContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      scope: new Scope(),
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onSubmit(ev, form) {
    ev.preventDefault();
    ScopeController.createScope(this.store, this.props.job.id, form)
      .then(() => {
        this.setState({ scope: new Scope() });
      });
  }

  onCancel() {
    this.setState({ scope: new Scope() });
  }

  render() {
    return (
      <Form
        scope={this.state.scope}
        onSubmit={this.onSubmit}
        onCancel={this.onCancel}
      />
    );
  }
}

CreateContainer.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

CreateContainer.contextTypes = {
  store: PropTypes.object,
};

export default CreateContainer;
