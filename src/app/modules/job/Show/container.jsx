import React from 'react';
import Edit from './components/edit';
import View from './components/view';
import { getJob, putJob } from '../actions';
import { initialState } from '../reducer';

class ShowJobContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      job: initialState,
      mode: props.params.mode,
    };

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
    if (this.state.mode === 'edit') {
      return (
        <Edit
          job={this.state.job}
          onSubmit={this.onSubmit}
        />
      );
    }
    return <View job={this.state.job} />;
  }
}

ShowJobContainer.propTypes = {
  params: React.PropTypes.shape({
    id: React.PropTypes.string,
    mode: React.PropTypes.string,
  }).isRequired,
  onUpdateSuccess: React.PropTypes.func.isRequired,
};

ShowJobContainer.contextTypes = {
  store: React.PropTypes.object,
};

export default ShowJobContainer;
