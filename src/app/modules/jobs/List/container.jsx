import React from 'react';
import List from './components/list';
import { getJobs } from '../actions';

class ShowJobListContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      jobs: [],
    };
  }

  componentWillMount() {
    const { jobs } = this.store.getState();
    if (jobs.results.length === 0) {
      this.store.dispatch(getJobs());
    } else {
      this.setState({ jobs: this.store.getState().jobs.results });
    }
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      this.setState({ jobs: this.store.getState().jobs.results });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (<List
      jobs={this.state.jobs}
      onClickJob={this.props.onClickJob}
    />);
  }
}

ShowJobListContainer.contextTypes = {
  store: React.PropTypes.object,
};

ShowJobListContainer.propTypes = {
  onClickJob: React.PropTypes.func.isRequired,
};

export default ShowJobListContainer;
