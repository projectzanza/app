import React from 'react';
import PropTypes from 'prop-types';
import List from './components/list';
import Job from '../model';
import JobController from '../controller';

class ShowJobListContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      jobs: this.props.jobs,
    };

    this.onClickRegisterInterest = this.onClickRegisterInterest.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ jobs: nextProps.jobs });
  }

  onClickRegisterInterest(ev, job) {
    ev.preventDefault();

    JobController.registerInterest(
      this.store,
      job.id,
      this.props.userId,
    );
  }

  render() {
    return (<List
      jobs={this.state.jobs}
      onClickJob={this.props.onClickJob}
      onClickRegisterInterest={this.props.allowRegisterInterest && this.onClickRegisterInterest}
    />);
  }
}

ShowJobListContainer.contextTypes = {
  store: PropTypes.object,
};

ShowJobListContainer.propTypes = {
  onClickJob: PropTypes.func.isRequired,
  jobs: PropTypes.arrayOf(
    Job.propTypes,
  ).isRequired,
  userId: PropTypes.string.isRequired,
  allowRegisterInterest: PropTypes.bool,
};

ShowJobListContainer.defaultProps = {
  allowRegisterInterest: false,
};

export default ShowJobListContainer;
