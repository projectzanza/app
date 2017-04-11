import React from 'react';
import { Button } from 'react-bootstrap';
import UserPropTypes from '../../propTypes';

const User = props => (
  <Button block onClick={e => props.onClick(e, props.user)} >
    <dl className="dl-horizontal">
      <dt>{ props.user.name }</dt>
      <dd>{ props.user.email }</dd>
    </dl>
  </Button>
);

User.propTypes = {
  user: UserPropTypes.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

export default User;
