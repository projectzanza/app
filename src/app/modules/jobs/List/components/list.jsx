import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import JobView from './job';
import Job from '../../model';

class List extends React.Component {

  clickAcceptFunc(job) {
    if (this.props.canClickAccept && this.props.onClickAccept) {
      return this.props.canClickAccept(job) && this.props.onClickAccept;
    }
    return undefined;
  }

  listItems() {
    return this.props.jobs.map(job => <JobView
      key={job.id}
      job={job}
      userId={this.props.userId}
      onClick={this.props.onClickJob}
      allowRegisterInterest={this.props.allowRegisterInterest}
      onClickRegisterInterest={this.props.onClickRegisterInterest}
      onClickAccept={this.clickAcceptFunc(job)}
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
  userId: PropTypes.string,
  onClickJob: PropTypes.func.isRequired,
  allowRegisterInterest: PropTypes.bool,
  onClickRegisterInterest: PropTypes.func,
  canClickAccept: PropTypes.func,
  onClickAccept: PropTypes.func,
};

List.defaultProps = {
  userId: undefined,
  allowRegisterInterest: false,
  onClickRegisterInterest: undefined,
  canClickAccept: undefined,
  onClickAccept: undefined,
};

export default List;
