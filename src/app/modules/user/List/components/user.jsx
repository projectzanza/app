import React from 'react';
import { Button } from 'react-bootstrap';
import User from '../../model';

const View = props => (
  <div>
    <Button block onClick={e => props.onClick(e, props.user)} >
      <dl className="dl-horizontal">
        <dt>{ props.user.name }</dt>
        <dd>{ props.user.email }</dd>
      </dl>
    </Button>
    { props.onClickInvite &&
      <Button onClick={e => props.onClickInvite(e, props.user)}>
        Invite
      </Button>
    }
  </div>
);

View.propTypes = {
  user: User.propTypes.isRequired,
  onClick: React.PropTypes.func.isRequired,
  onClickInvite: React.PropTypes.func,
};

View.defaultProps = {
  onClickInvite: undefined,
};

export default View;
