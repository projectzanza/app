import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { injectStripe, CardElement } from 'react-stripe-elements';

const Form = props => (
  <form onSubmit={ev => props.onSubmit(ev, props.stripe)}>
    Card details <CardElement style={{ base: { fontSize: '18px' } }} />
    <Button onClick={props.onHide}>Cancel</Button>
    <Button type="submit">Add New Card</Button>
  </form>
);

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  stripe: PropTypes.shape({
    createToken: PropTypes.func,
  }).isRequired,
};

export default injectStripe(Form);
