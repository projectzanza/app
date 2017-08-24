import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import EstimateController from '../controller';

const CreateEstimate = (props, context) => (
  <Button
    bsStyle="primary"
    onClick={() => EstimateController.createEstimate(context.store, props.jobId)}
  > Create New Estiamte </Button>
);

CreateEstimate.propTypes = {
  jobId: PropTypes.string.isRequired,
};

CreateEstimate.contextTypes = {
  store: PropTypes.object,
};

export default CreateEstimate;

