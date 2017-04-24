import React from 'react';
import uuid from 'uuid/v4';
import List from './components/list';
import {
  getMatchingUsersForJob,
  getInvitedUsersForJob,
} from '../actions';
import { storeResults } from '../../../lib/store/utils';

class ListContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      users: [],
    };
    this.resultsId = uuid();

    this.onClickInviteUser = this.onClickInviteUser.bind(this);
  }

  componentWillMount() {
    this.getUsers(this.props.jobId);
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      this.setState({ users: storeResults(this.store, 'user', this.resultsId) });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.jobId !== nextProps.jobId) {
      this.getUsers(nextProps.jobId);
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getUsers(jobId) {
    if (this.props.match && jobId) {
      this.store.dispatch(getMatchingUsersForJob({
        jobId,
        resultsId: this.resultsId,
      }));
    } else if (this.props.invited && jobId) {
      this.store.dispatch(getInvitedUsersForJob({
        jobId,
        resultsId: this.resultsId,
      }));
    }
  }

  onClickInviteUser(ev, user) {
    this.props.onClickInviteUser(ev, user, this.resultsId);
  }

  render() {
    return (
      <List
        users={this.state.users}
        onClickInviteUser={this.props.onClickInviteUser && this.onClickInviteUser}
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
  onClickInviteUser: React.PropTypes.func,
  match: React.PropTypes.bool,
  invited: React.PropTypes.bool,
};

ListContainer.defaultProps = {
  onClickInviteUser: undefined,
  match: undefined,
  invited: undefined,
};

export default ListContainer;
