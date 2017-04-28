import React from 'react';
import PropTypes from 'prop-types';
import { tr, td, Button } from 'react-bootstrap';
import User from '../../model';

const View = props => (
  <tr>
    <td>
      <Button block className="clear" onClick={e => props.onClick(e, props.user)} >
        { props.user.name }
      </Button>
    </td>
    <td>
      <Button block className="clear" onClick={e => props.onClick(e, props.user)} >
        { props.user.email }
      </Button>
    </td>
    { props.onClickInvite &&
      <td>
        <Button onClick={e => props.onClickInvite(e, props.user)}>
          Invite
        </Button>
      </td>
    }
  </tr>
);

View.propTypes = {
  user: User.propTypes.isRequired,
  onClick: PropTypes.func.isRequired,
  onClickInvite: PropTypes.func,
};

View.defaultProps = {
  onClickInvite: undefined,
};

export default View;
