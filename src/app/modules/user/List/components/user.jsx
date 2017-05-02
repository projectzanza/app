import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ButtonToolbar,
} from 'react-bootstrap';
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
    { (props.onClickInvite || props.onClickAward) &&
      <td>
        <ButtonToolbar>
          { props.onClickInvite &&
          <Button onClick={e => props.onClickInvite(e, props.user)}>
            Invite
          </Button>
          }
          { props.onClickAward &&
          <Button onClick={e => props.onClickAward(e, props.user)}>
            Award
          </Button>
          }
        </ButtonToolbar>
      </td>
    }
  </tr>
);

View.propTypes = {
  user: User.propTypes.isRequired,
  onClick: PropTypes.func.isRequired,
  onClickInvite: PropTypes.func,
  onClickAward: PropTypes.func,
};

View.defaultProps = {
  onClickInvite: undefined,
  onClickAward: undefined,
};

export default View;
