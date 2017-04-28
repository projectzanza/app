import React from 'react';
import PropTypes from 'prop-types';
import QuickCreateJob from './components/form';
import { createJob } from '../actions';
import Job from '../model';

class QuickCreateJobContainer extends React.Component {

  constructor(props) {
    super(props);
    this.onSubmitCreateJob = this.onSubmitCreateJob.bind(this);
  }

  onSubmitCreateJob(e, form) {
    e.preventDefault();
    const { store } = this.context;
    store.dispatch(createJob(form))
      .then((id) => {
        this.props.onSubmitSuccess(Job.find(store, id));
      });
  }

  render() {
    return (
      <QuickCreateJob onSubmit={this.onSubmitCreateJob} />
    );
  }
}

QuickCreateJobContainer.contextTypes = {
  store: PropTypes.object,
};

QuickCreateJobContainer.propTypes = {
  onSubmitSuccess: PropTypes.func.isRequired,
};

export default QuickCreateJobContainer;
