import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import Card from '../../model';
import ItemView from './card';

export default class List extends React.Component {
  listItems() {
    return this.props.cards.map(
      card => <ItemView
        card={card}
        onCardSelect={this.props.onCardSelect}
      />,
    );
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
  cards: PropTypes.arrayOf(
    Card.propTypes,
  ).isRequired,
  onCardSelect: PropTypes.func.isRequired,
};
