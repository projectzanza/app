import React from 'react';
import QuickCreateJob from './components/form';
import { createJob } from '../actions';
import { singleItem } from '../../../lib/store/utils';

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
        this.props.onSubmitSuccess(singleItem(store, 'jobs', id));
      });
  }

  render() {
    return (
      <QuickCreateJob onSubmit={this.onSubmitCreateJob} />
    );
  }
}

QuickCreateJobContainer.contextTypes = {
  store: React.PropTypes.object,
};

QuickCreateJobContainer.propTypes = {
  onSubmitSuccess: React.PropTypes.func.isRequired,
};

export default QuickCreateJobContainer;
