import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
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
      <Table striped bordered condensed hover>
        <tbody>
          {this.listItems()}
        </tbody>
      </Table>
    );
  }
}

List.propTypes = {
  jobs: PropTypes.arrayOf(
    Job.propTypes,
  ).isRequired,
  onClickJob: PropTypes.func.isRequired,
};

export default List;
