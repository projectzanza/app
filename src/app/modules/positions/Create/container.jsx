import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import PositionController from '../controller';
import UserController from '../../user/controller';


const CreatePosition = (props, context) => {
  if (UserController.currentUser(context.store).id === props.userId) {
    return (
      <Button
        bsStyle="primary"
        onClick={() => PositionController.createPosition(context.store, props.userId)}
      > Create New Position </Button>
    );
  }
  return null;
};

CreatePosition.propTypes = {
  userId: PropTypes.string.isRequired,
};

CreatePosition.contextTypes = {
  store: PropTypes.object,
};

export default CreatePosition;

