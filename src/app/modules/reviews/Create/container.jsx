import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import ReviewController from '../controller';
import UserController from '../../user/controller';
import Job from '../../jobs/model';

const CreateReview = (props, context) => {
  if (props.job.reviews(context.store, UserController.currentUser(context.store).id).length === 0) {
    return (
      <Button
        bsStyle="primary"
        onClick={() => ReviewController.createReview(context.store, props.job.id, props.subjectId)}
      > Create New Review
      </Button>
    );
  }
  return null;
};

CreateReview.propTypes = {
  subjectId: PropTypes.string.isRequired,
  job: Job.propTypes.isRequired,
};

CreateReview.contextTypes = {
  store: PropTypes.object,
};

export default CreateReview;

