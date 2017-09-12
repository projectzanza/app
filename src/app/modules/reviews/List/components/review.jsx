import React from 'react';
import PropTypes from 'prop-types';
import {
  ButtonToolbar,
  Button,
} from 'react-bootstrap';
import Review from '../../model';
import StarRating from '../../../../components/Rating/rating';

const ReviewView = props => (
  <tr>
    <td> Description: {props.review.description}</td>
    <td> Ability:
      <StarRating
        value={props.review.ability}
        name="ability"
        readonly
      />
    </td>
    <td> Communication
      <StarRating
        value={props.review.communication}
        name="communication"
        readonly
      />
    </td>
    <td> Speed
      <StarRating
        value={props.review.speed}
        name="speed"
        readonly
      />
    </td>
    <td> Overall
      <StarRating
        value={props.review.overall}
        name="overall"
        readonly
      />
    </td>
    <td>
      <ButtonToolbar>
        { !props.readonly && props.onEdit(props.review) &&
          <Button onClick={props.onEdit(props.review)}> Edit </Button>
        }
      </ButtonToolbar>
    </td>
  </tr>
);

ReviewView.propTypes = {
  review: Review.propTypes.isRequired,
  onEdit: PropTypes.func.isRequired,
  readonly: PropTypes.bool.isRequired,
};
export default ReviewView;
