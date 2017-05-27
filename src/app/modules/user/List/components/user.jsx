import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ButtonToolbar,
  Label,
} from 'react-bootstrap';
import _ from 'lodash';
import User from '../../model';
import Estimate from '../../../estimates/model';

const View = (props, context) => {
  const { store } = context;
  const estimate = props.user.estimate(store, props.jobId);
  const collaborationState = _.get(props.user, 'meta.job.collaboration_state');

  return (
    <tr>
      <td>
        <Button block className="clear" onClick={e => props.onClick(e, props.user)} >
          { collaborationState &&
          <Label bsStyle="success">{ collaborationState }</Label>
          }
          &nbsp;
          { props.user.name }
        </Button>
      </td>
      <td>
        <Button block className="clear" onClick={e => props.onClick(e, props.user)} >
          { props.user.email }
        </Button>
      </td>
      <td>
        { estimate && estimate.total }
      </td>
      <td>
        <ButtonToolbar>
          { props.onClickInvite &&
          <Button bsStyle="primary" onClick={e => props.onClickInvite(e, props.user)}>
            Invite
          </Button>
          }
          { props.onClickAward &&
          <Button bsStyle="primary" onClick={e => props.onClickAward(e, props.user)}>
            Award
          </Button>
          }
          {
            props.onClickReject &&
            <Button bsStyle="danger" onClick={e => props.onClickReject(e, props.user)}>
              Reject
            </Button>
          }
        </ButtonToolbar>
      </td>
    </tr>
  );
};

View.propTypes = {
  user: User.propTypes.isRequired,
  jobId: PropTypes.string,
  estimate: Estimate.propTypes,
  onClick: PropTypes.func.isRequired,
  onClickInvite: PropTypes.func,
  onClickAward: PropTypes.func,
  onClickReject: PropTypes.func,
};

View.defaultProps = {
  jobId: undefined,
  onClickInvite: undefined,
  onClickAward: undefined,
  onClickReject: undefined,
  estimate: {},
};

View.contextTypes = {
  store: PropTypes.object,
};

export default View;
