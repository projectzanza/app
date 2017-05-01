import React from 'react';
import PropTypes from 'prop-types';
import ShowUser from '../../modules/user/Profile/container';
import JobController from '../../modules/jobs/controller';

class UserShowScene extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {};
  }

  componentWillMount() {
    if (this.props.params.jobId) {
      JobController.fetchJob(this.store, this.props.params.jobId);
    }
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      if (this.props.params.jobId) {
        this.setState({ job: JobController.getJob(this.store, this.props.params.jobId) });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    // // job needs to be loaded before showing the ShowUser
    if (!this.props.params.jobId || (this.props.params.jobId && this.state.job)) {
      return (
        <ShowUser
          job={this.state.job}
          id={this.props.params.id}
          mode={this.props.params.mode}
        />
      );
    }
    return null;
  }
}

UserShowScene.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
    mode: PropTypes.string,
    jobId: PropTypes.string,
  }).isRequired,
};

UserShowScene.contextTypes = {
  store: PropTypes.object,
};

export default UserShowScene;
