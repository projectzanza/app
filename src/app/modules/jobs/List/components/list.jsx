import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import JobView from './job';
import Job from '../../model';

class List extends React.Component {

  listItems() {
    return this.props.jobs.map(job => <JobView
      key={job.id}
      job={job}
      onClick={this.props.onClickJob}
      allowRegisterInterest={this.props.allowRegisterInterest}
      onClickRegisterInterest={this.props.onClickRegisterInterest}
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
  allowRegisterInterest: PropTypes.bool,
  onClickRegisterInterest: PropTypes.func,
};

List.defaultProps = {
  allowRegisterInterest: false,
  onClickRegisterInterest: undefined,
};

export default List;
