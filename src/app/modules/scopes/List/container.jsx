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
    this.onClickEdit = this.onClickEdit.bind(this);
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

  onClickComplete(scope) {
    if ((this.props.currentUser.id === _.get(this.props.participatingUser, 'id')) &&
      (scope.state === Scope.states.open || scope.state === Scope.states.rejected)) {
      return () => {
        ScopeController.completeScope(this.store, this.props.job.id, scope.id);
      };
    }
    return undefined;
  }

  onClickVerify(scope) {
    if (this.props.currentUser.id === this.props.job.user_id &&
      scope.state !== Scope.states.verified) {
      return () => {
        ScopeController.verifyScope(this.store, this.props.job.id, scope.id);
      };
    }
    return undefined;
  }

  onClickReject(scope) {
    if (this.props.currentUser.id === this.props.job.user_id &&
      (scope.state === Scope.states.completed || scope.state === Scope.states.verified)) {
      return () => {
        ScopeController.rejectScope(this.store, this.props.job.id, scope.id);
      };
    }
    return undefined;
  }

  onClickEdit(scope) {
    if (this.props.currentUser.id === this.props.job.user_id) {
      return () => {
        ScopeController.editScope(this.store, scope);
      };
    }
    return undefined;
  }

  render() {
    return (<List
      scopes={this.state.scopes}
      jobId={this.props.job.id}
      onClickComplete={this.onClickComplete}
      onClickVerify={this.onClickVerify}
      onClickReject={this.onClickReject}
      onClickEdit={this.onClickEdit}
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
