import React from 'react';
import List from './components/list';
import Job from '../model';

class ShowJobListContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      jobs: this.props.jobs,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ jobs: nextProps.jobs });
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
  jobs: React.PropTypes.arrayOf(
    Job.propTypes,
  ).isRequired,
};

export default ShowJobListContainer;
