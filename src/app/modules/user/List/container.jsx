import React from 'react';
import uuid from 'uuid/v4';
import List from './components/list';
import { getMatchingUsersForJob } from '../actions';
import { storeResults } from '../../../lib/store/utils';

class ListContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      users: [],
    };
    this.resultsId = uuid();
  }

  componentWillMount() {
    this.setUsers(this.props.jobId);
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      this.setState({ users: storeResults(this.store, 'user', this.resultsId) });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setUsers(nextProps.jobId);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  setUsers(jobId) {
    this.store.dispatch(getMatchingUsersForJob({
      jobId,
      resultsId: this.resultsId,
    }));
  }

  render() {
    return (
      <List
        users={this.state.users}
        onClickUser={this.props.onClickUser}
      />
    );
  }
}

ListContainer.contextTypes = {
  store: React.PropTypes.object,
};

ListContainer.propTypes = {
  jobId: React.PropTypes.string.isRequired,
  onClickUser: React.PropTypes.func.isRequired,
};

export default ListContainer;
