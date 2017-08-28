import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import ScopeController from '../controller';
import UserController from '../../user/controller';
import Job from '../../jobs/model';

const CreateScope = (props, context) => {
  if (UserController.currentUser(context.store).id === props.job.user_id) {
    return (
      <Button
        bsStyle="primary"
        onClick={() => ScopeController.createScope(context.store, props.job.id)}
      > Create New Scope </Button>
    );
  }
  return null;
};

CreateScope.propTypes = {
  job: Job.propTypes.isRequired,
};

CreateScope.contextTypes = {
  store: PropTypes.object,
};

export default CreateScope;

