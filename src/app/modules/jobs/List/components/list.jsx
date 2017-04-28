import React from 'react';
import JobComponent from './job';
import Job from '../../model';

class List extends React.Component {

  listItems() {
    return this.props.jobs.map(job => <JobComponent
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
    Job.propTypes,
  ).isRequired,
  onClickJob: React.PropTypes.func.isRequired,
};

export default List;
