import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
} from 'react-bootstrap';
import StarRating from '../../../../components/Rating/rating';
import Review from '../../model';

class ReviewForm extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      review: props.review,
    };

    this.onChange = this.onChange.bind(this);
    this.onRatingChange = this.onRatingChange.bind(this);
  }

  onChange(event) {
    const review = this.state.review;
    review[event.target.name] = event.target.value;
    this.setState({ review });
  }

  onRatingChange(name, rating) {
    const review = this.state.review;
    review[name] = rating;
    this.setState({ review });
  }

  render() {
    return (
      <form onSubmit={(e) => { this.props.onSubmit(e, this.state.review); }}>
        <FormGroup>
          <ControlLabel htmlFor="description">Description</ControlLabel>
          <FormControl
            type="text"
            name="description"
            value={this.state.review.description}
            onChange={this.onChange}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="ability">Ability
            <StarRating
              name="ability"
              onChange={this.onRatingChange}
              value={this.state.review.ability}
            />
          </label>
        </FormGroup>
        <FormGroup>
          <label htmlFor="communication">Communication
            <StarRating
              name="communication"
              onChange={this.onRatingChange}
              value={this.state.review.communication}
            />
          </label>
        </FormGroup>
        <FormGroup>
          <label htmlFor="speed">Speed
            <StarRating
              name="speed"
              onChange={this.onRatingChange}
              value={this.state.review.speed}
            />
          </label>
        </FormGroup>
        <FormGroup>
          <label htmlFor="overall">Overall
            <StarRating
              name="overall"
              onChange={this.onRatingChange}
              value={this.state.review.overall}
            />
          </label>
        </FormGroup>
        <FormGroup>
          <Button onClick={this.props.onCancel}>Cancel</Button>
          <Button type="submit" bsStyle="primary">Submit</Button>
        </FormGroup>
      </form>
    );
  }
}

ReviewForm.propTypes = {
  review: Review.propTypes.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ReviewForm;
