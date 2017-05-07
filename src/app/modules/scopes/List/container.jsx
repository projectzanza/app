import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import List from './components/list';
import ScopeController from '../controller';
import Scope from '../model';

class ListContainer extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      scopes: [],
    };

    this.onClickComplete = this.onClickComplete.bind(this);
    this.onClickVerify = this.onClickVerify.bind(this);
    this.onClickReject = this.onClickReject.bind(this);
    this.canClickComplete = this.canClickComplete.bind(this);
    this.canClickVerify = this.canClickVerify.bind(this);
    this.canClickReject = this.canClickReject.bind(this);
  }

  componentDidMount() {
    ScopeController.fetchScopes(this.store, this.props.job.id);

    this.unsubscribe = this.store.subscribe(() => {
      if (this.props.job) {
        this.setState({
          scopes: this.props.job.scopes(this.store),
        });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onClickComplete(ev, scope) {
    ev.preventDefault();
    ScopeController.completeScope(this.store, this.props.job.id, scope.id);
  }

  onClickVerify(ev, scope) {
    ev.preventDefault();
    ScopeController.verifyScope(this.store, this.props.job.id, scope.id);
  }

  onClickReject(ev, scope) {
    ev.preventDefault();
    ScopeController.rejectScope(this.store, this.props.job.id, scope.id);
  }

  canClickComplete(scope) {
    return (
        this.props.currentUser.id === _.get(this.props.participatingUser, 'id')
      ) && (
        scope.state === Scope.states.open || scope.state === Scope.states.rejected
      );
  }

  canClickVerify(scope) {
    return this.props.currentUser.id === this.props.job.user_id &&
      scope.state !== Scope.states.verified;
  }

  canClickReject(scope) {
    return (
      this.props.currentUser.id === this.props.job.user_id
      && (scope.state === Scope.states.completed ||
        scope.state === Scope.states.verified)
    );
  }

  render() {
    return (<List
      scopes={this.state.scopes}
      jobId={this.props.job.id}
      canClickComplete={this.canClickComplete}
      onClickComplete={this.onClickComplete}
      canClickVerify={this.canClickVerify}
      onClickVerify={this.onClickVerify}
      canClickReject={this.canClickReject}
      onClickReject={this.onClickReject}
    />);
  }
}

ListContainer.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.string,
    scopes: PropTypes.func,
    user_id: PropTypes.string,
  }),
  currentUser: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  participatingUser: PropTypes.shape({
    id: PropTypes.string,
  }),
};

ListContainer.defaultProps = {
  job: undefined,
  participatingUser: undefined,
};

ListContainer.contextTypes = {
  store: PropTypes.object,
};

export default ListContainer;
