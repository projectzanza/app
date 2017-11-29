import React from 'react';
import PropTypes from 'prop-types';
import ConsultantFilterForm from './components/form';
import Job from '../model';

class ConsultantFilterContainer extends React.Component {
  constructor(props, context) {
    super();
    this.store = context.store;
    this.state = { filters: props.consultantFilter };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e, form) {
    e.preventDefault();
    this.props.onSubmitSuccess(form);
  }

  render() {
    return (
      <ConsultantFilterForm
        onSubmit={this.onSubmit}
        filters={this.state.filters}
      />
    );
  }
}

ConsultantFilterContainer.contextTypes = {
  store: PropTypes.object,
};

ConsultantFilterContainer.propTypes = {
  consultantFilter: Job.consultantFilterPropType,
  onSubmitSuccess: PropTypes.func.isRequired,
};

ConsultantFilterContainer.defaultProps = {
  consultantFilter: {},
};

export default ConsultantFilterContainer;
