import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Edit from './components/edit';
import View from './components/view';
import { putJob } from '../actions';
import Job from '../model';
import JobController from '../controller';

import ModalConfirmVerify from '../ModalConfirmVerify/modal';

class ShowJobContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      job: props.job,
      mode: props.mode,
    };

    this.onEdit = this.onEdit.bind(this);
    this.onCancelEdit = this.onCancelEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.showRegisterInterest = this.showRegisterInterest.bind(this);
    this.onClickRegisterInterest = this.onClickRegisterInterest.bind(this);
    this.canClickAccept = this.canClickAccept.bind(this);
    this.onClickAccept = this.onClickAccept.bind(this);
    this.onClickVerify = this.onClickVerify.bind(this);
    this.verifyJob = this.verifyJob.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      mode: nextProps.mode,
      job: nextProps.job,
    });
  }

  onSubmit(e, form) {
    e.preventDefault();
    this.store.dispatch(putJob(form))
      .then(() => {
        this.setState({ mode: 'view' });
        this.props.onSubmitSuccess();
      });
  }

  onEdit() {
    this.setState({ mode: 'edit' });
  }

  onCancelEdit() {
    this.setState({ mode: 'view' });
  }

  onClickRegisterInterest() {
    JobController.registerInterest(this.store, this.state.job.id, this.props.currentUser.id);
  }

  onClickAccept() {
    JobController.acceptJob(this.store, this.state.job.id, this.props.currentUser.id);
  }

  onClickVerify() {
    if (JobController.canVerifyJobComplete(this.state.job, this.props.currentUser.id)) {
      return () => {
        ReactDOM.render(
          <ModalConfirmVerify
            onConfirm={this.verifyJob}
            show
          />,
          document.getElementById('modal'),
        );
      };
    }
    return undefined;
  }

  canClickAccept() {
    return JobController.canAcceptJob(this.state.job, this.props.currentUser) || undefined;
  }

  showRegisterInterest() {
    return (this.props.currentUser.id !== this.state.job.user_id) &&
      !_.get(this.state.job, 'meta.current_user.collaboration_state');
  }

  verifyJob() {
    JobController.verifyJobComplete(this.store, this.state.job.id)
      .then(() => JobController.fetchScopes(this.store, this.state.job.id));
  }

  render() {
    if (this.state.mode === 'edit') {
      return (
        <Edit
          job={this.state.job}
          onSubmit={this.onSubmit}
          onCancel={this.onCancelEdit}
        />
      );
    }
    return (
      <View
        job={this.state.job}
        showEdit={this.props.currentUser.id === this.state.job.user_id}
        onEdit={this.onEdit}
        showRegisterInterest={this.showRegisterInterest()}
        onClickRegisterInterest={this.onClickRegisterInterest}
        onClickAccept={this.canClickAccept() && this.onClickAccept}
        onClickVerify={this.onClickVerify()}
      />
    );
  }
}

ShowJobContainer.propTypes = {
  job: Job.propTypes,
  mode: PropTypes.string,
  currentUser: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
};

ShowJobContainer.defaultProps = {
  matchingUserListScene: undefined,
  mode: 'view',
  job: new Job(),
};

ShowJobContainer.contextTypes = {
  store: PropTypes.object,
};

export default ShowJobContainer;
