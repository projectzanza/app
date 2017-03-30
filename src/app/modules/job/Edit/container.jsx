import React from 'react';
import Form from './components/form';
import { getJob, patchJob } from '../actions';

class EditContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = { job: undefined };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    const job = this.store.getState().job;
    if (this.props.params.id !== job.id) {
      this.store.dispatch(getJob(this.props.params.id));
    }
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      this.setState({ job: this.store.getState().job });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onSubmit(e, form) {
    e.preventDefault();
    this.store.dispatch(putJob(form))
      .then(this.props.onUpdateSuccess);
  }

  render() {
    return (
      <Form
        job={this.state.job}
        onSubmit={this.onSubmit}
      />
    );
  }
}

EditContainer.propTypes = {
  params: React.PropTypes.shape({
    id: React.PropTypes.string,
  }).isRequired,
  onUpdateSuccess: React.PropTypes.func.isRequired,
};

EditContainer.contextTypes = {
  store: React.PropTypes.object,
};

export default EditContainer;
