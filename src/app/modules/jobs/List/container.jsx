import React from 'react';
import uuid from 'uuid/v4';
import List from './components/list';
import { getUserJobs, getMatchingJobsForUser } from '../actions';
import { getJoinEntities } from '../../../lib/store/utils';

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
      }));
    } else {
      this.store.dispatch(getUserJobs({
        userId: this.props.userId,
      }));
    }
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      this.setState({ jobs: this.queryJobs() });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  queryJobs() {
    if (this.props.matching) {
      return getJoinEntities({
        store: this.store,
        primaryKey: this.props.userId,
        joinTable: 'userMatchingJobs',
        entityTable: 'jobs',
      });
    }
    return getJoinEntities({
      store: this.store,
      primaryKey: this.props.userId,
      joinTable: 'userJobs',
      entityTable: 'jobs' });
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
