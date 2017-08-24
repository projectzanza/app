import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import EstimateView from './estimate';
import Estimate from '../../model';

class List extends React.Component {

  listItems() {
    return this.props.estimates.map(estimate => <EstimateView
      key={estimate.id}
      estimate={estimate}
      onClickEdit={this.props.onClickEdit}
      onClickDelete={this.props.onClickDelete}
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
  estimates: PropTypes.arrayOf(
    Estimate.propTypes,
  ).isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};

export default List;
