import React from 'react';
import PropTypes from 'prop-types';
import Edit from './components/edit';
import View from './components/view';
import { putJob } from '../actions';
import Job from '../model';
import JobController from '../controller';

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
    this.onClickRegisterInterest = this.onClickRegisterInterest.bind(this);
    this.onClickAccept = this.onClickAccept.bind(this);
    this.onClickVerify = this.onClickVerify.bind(this);
    this.onClickComplete = this.onClickComplete.bind(this);
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
    if (this.props.currentUser.id === this.state.job.user_id) {
      return () => {
        this.setState({ mode: 'edit' });
        this.props.onModeChange('edit');
      };
    }
    return undefined;
  }

  onCancelEdit() {
    this.setState({ mode: 'view' });
    this.props.onModeChange('view');
  }

  onClickRegisterInterest() {
    if (JobController.canRegisterInterest(this.state.job, this.props.currentUser)) {
      return () => {
        JobController.registerInterest(this.store, this.state.job.id, this.props.currentUser.id);
      };
    }
    return undefined;
  }

  onClickAccept() {
    if (JobController.canAcceptJob(this.state.job, this.props.currentUser)) {
      return () =>
        JobController.acceptJob(this.store, this.state.job.id, this.props.currentUser.id);
    }
    return undefined;
  }

  onClickVerify() {
    if (JobController.canVerifyJobComplete(this.state.job, this.props.currentUser.id)) {
      return () => {
        JobController.verifyJobComplete(this.store, this.state.job.id);
      };
    }
    return undefined;
  }

  onClickComplete() {
    if (JobController.canCompleteJob(this.store, this.state.job, this.props.currentUser.id)) {
      return () => JobController.completeJob(this.store, this.state.job.id);
    }
    return undefined;
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
        onEdit={this.onEdit}
        onClickRegisterInterest={this.onClickRegisterInterest}
        onClickAccept={this.onClickAccept}
        onClickVerify={this.onClickVerify}
        onClickComplete={this.onClickComplete}
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
  onModeChange: PropTypes.func.isRequired,
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
