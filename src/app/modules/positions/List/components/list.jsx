import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import PositionView from './position';
import Position from '../../model';

class List extends React.Component {
  listItems() {
    return this.props.positions.map(position => (<PositionView
      key={position.id}
      position={position}
      onClickEdit={this.props.onClickEdit}
      onClickDelete={this.props.onClickDelete}
    />));
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
  positions: PropTypes.arrayOf(Position.propTypes).isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};

export default List;
