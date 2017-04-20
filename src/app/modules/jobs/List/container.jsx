import React from 'react';
import uuid from 'uuid/v4';
import List from './components/list';
import { getJobs, getMatchingJobsForUser } from '../actions';
import { storeResults } from '../../../lib/store/utils';

class ShowJobListContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      jobs: [],
    };
    this.resultsId = uuid();
  }

  componentWillMount() {
    if (this.props.matching) {
      this.store.dispatch(getMatchingJobsForUser({
        userId: this.props.userId,
        resultsId: this.resultsId,
      }));
    } else {
      this.store.dispatch(getJobs({
        userId: this.props.userId,
        resultsId: this.resultsId,
      }));
    }
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      this.setState({ jobs: storeResults(this.store, 'jobs', this.resultsId) });
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
  userId: React.PropTypes.string,
  matching: React.PropTypes.bool,
};

ShowJobListContainer.defaultProps = {
  userId: undefined,
  matching: undefined,
};

export default ShowJobListContainer;
