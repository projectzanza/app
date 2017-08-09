import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Card from '../../model';

const View = props => (
  <tr>
    <td>
      { props.card.brand }
    </td>
    <td>
      { props.card.last4 }
    </td>
    <td>
      { props.card.exp_year }
    </td>
    <td>
      <Button onClick={() => props.onCardSelect(props.card.id)}> Select </Button>
    </td>
  </tr>
);

View.propTypes = {
  card: Card.propTypes.isRequired,
  onCardSelect: PropTypes.func.isRequired,
};

export default View;
