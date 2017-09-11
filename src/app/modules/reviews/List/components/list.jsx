import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import ReviewView from './review';
import Review from '../../model';

class List extends React.Component {

  listItems() {
    return this.props.reviews.map(review => <ReviewView
      key={review.id}
      review={review}
      onEdit={this.props.onEdit}
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
  reviews: PropTypes.arrayOf(
    Review.propTypes,
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default List;
