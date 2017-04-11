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
    const job = this.job();
    if (job) {
      this.setState({ job });
    } else {
      this.store.dispatch(getJob(this.props.params.id));
    }
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      const job = this.job();
      if (job) {
        this.setState({ job });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ mode: nextProps.params.mode });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onSubmit(e, form) {
    e.preventDefault();
    this.store.dispatch(putJob(form))
      .then(() => {
        this.props.onUpdateSuccess(this.job());
      });
  }

  job() {
    const { jobs } = this.store.getState();
    return jobs.items[this.props.params.id];
  }

  render() {
    if (this.state.mode === 'edit') {
      return (
        <Edit
          job={this.state.job}
          onSubmit={this.onSubmit}
          onCancel={this.props.onCancelEdit}
        />
      );
    }
    return (
      <View
        job={this.state.job}
        onEdit={this.props.onEdit}
      />
    );
  }
}

ShowJobContainer.propTypes = {
  params: React.PropTypes.shape({
    id: React.PropTypes.string,
    mode: React.PropTypes.string,
  }).isRequired,
  onUpdateSuccess: React.PropTypes.func.isRequired,
  onCancelEdit: React.PropTypes.func.isRequired,
  onEdit: React.PropTypes.func.isRequired,
};

ShowJobContainer.contextTypes = {
  store: React.PropTypes.object,
};

export default ShowJobContainer;
