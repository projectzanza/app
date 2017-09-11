import React from 'react';
import PropTypes from 'prop-types';
import List from './components/list';
import Review from '../model';
import UserController from '../../user/controller';
import ReviewController from '../controller';

class ReviewListContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      reviews: this.props.reviews,
    };

    this.onEdit = this.onEdit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ reviews: nextProps.reviews });
  }

  onEdit(review) {
    if (review.user_id === UserController.currentUser(this.store).id) {
      return () => {
        ReviewController.editReview(this.store, review);
      };
    }
    return undefined;
  }

  render() {
    return (<List
      reviews={this.state.reviews}
      onEdit={this.onEdit}
    />);
  }
}

ReviewListContainer.contextTypes = {
  store: PropTypes.object,
};

ReviewListContainer.propTypes = {
  reviews: PropTypes.arrayOf(
    Review.propTypes,
  ).isRequired,
};

export default ReviewListContainer;
