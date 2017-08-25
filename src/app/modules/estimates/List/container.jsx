import React from 'react';
import PropTypes from 'prop-types';
import List from './components/list';
import Estimate from '../model';
import EstimateController from '../controller';
import UserController from '../../user/controller';
import Job from '../../jobs/model';

class EstimateListContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      estimates: this.props.estimates,
      job: this.props.job,
      user: UserController.currentUser(this.store),
    };

    this.onClickEdit = this.onClickEdit.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickAccept = this.onClickAccept.bind(this);
    this.onClickReject = this.onClickReject.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ estimates: nextProps.estimates });
  }

  onClickAccept(estimate) {
    if (estimate.state !== 'accepted' && this.state.user.id === this.state.job.user_id) {
      return () => {
        EstimateController.acceptEstimate(this.store, estimate);
      };
    }
    return undefined;
  }

  onClickReject(estimate) {
    if (estimate.state !== 'rejected' && this.state.user.id === this.state.job.user_id) {
      return () => {
        EstimateController.rejectEstimate(this.store, estimate);
      };
    }
    return undefined;
  }

  onClickEdit(estimate) {
    if (this.state.user.id === estimate.user_id && estimate.state !== 'accepted') {
      return () => {
        EstimateController.editEstimate(this.store, estimate);
      };
    }
    return undefined;
  }

  onClickDelete(estimate) {
    if (this.state.user.id === estimate.user_id) {
      return () => {
        EstimateController.deleteEstimate(this.store, estimate);
      };
    }
    return undefined;
  }

  render() {
    return (
      <List
        estimates={this.state.estimates}
        onClickEdit={this.onClickEdit}
        onClickDelete={this.onClickDelete}
        onClickAccept={this.onClickAccept}
        onClickReject={this.onClickReject}
      />
    );
  }
}

EstimateListContainer.contextTypes = {
  store: PropTypes.object,
};

EstimateListContainer.propTypes = {
  estimates: PropTypes.arrayOf(
    Estimate.propTypes,
  ).isRequired,
  job: Job.propTypes.isRequired,
};

export default EstimateListContainer;
