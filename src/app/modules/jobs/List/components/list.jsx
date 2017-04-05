import React from 'react';
import Job from './job';
import JobPropType from '../../propTypes';

class List extends React.Component {

  listItems() {
    return this.props.jobs.map(job => <Job
      key={job.id}
      job={job}
      onClick={this.props.onClickJob}
    />);
  }

  render() {
    return (
      <div>
        {this.listItems()}
      </div>
    );
  }
}

List.propTypes = {
  jobs: React.PropTypes.arrayOf(
    JobPropType,
  ).isRequired,
  onClickJob: React.PropTypes.func.isRequired,
};

export default List;
