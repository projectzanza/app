import React from 'react';
import PropTypes from 'prop-types';
import {
  ButtonToolbar,
  Button,
} from 'react-bootstrap';
import Review from '../../model';

const ReviewView = props => (
  <tr>
    <td> Description: {props.review.description}</td>
    <td> Ability {props.review.ability}</td>
    <td> Communication {props.review.communication}</td>
    <td> Speed {props.review.speed}</td>
    <td> Overall {props.review.overall}</td>
    <td>
      <ButtonToolbar>
        { props.onEdit(props.review) &&
          <Button onClick={props.onEdit(props.review)}> Edit </Button>
        }
      </ButtonToolbar>
    </td>
  </tr>
);

ReviewView.propTypes = {
  review: Review.propTypes.isRequired,
  onEdit: PropTypes.func.isRequired,
};
export default ReviewView;
