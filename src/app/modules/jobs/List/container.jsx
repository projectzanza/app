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
    this.store.dispatch(getJobs(this.props.userId));
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      this.setState({ jobs: this.jobs() });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  jobs() {
    const { jobs } = this.store.getState();
    return jobs.resultIds.map(key => jobs.items[key]) || [];
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
  userId: React.PropTypes.string,
};

ShowJobListContainer.defaultProps = {
  userId: undefined,
};

export default ShowJobListContainer;
