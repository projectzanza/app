import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ButtonToolbar,
  Label,
} from 'react-bootstrap';
import _ from 'lodash';
import User from '../../model';

const View = (props, context) => {
  const { store } = context;
  // TODO: estimates need to be sorted by updated_at date to
  // display the latest estimate
  const estimates = props.user.estimates(store, props.jobId);
  const collaborationState = _.get(props.user, 'meta.job.collaboration_state');

  return (
    <tr>
      <td>
        <Button block className="clear" onClick={e => props.onClick(e, props.user)} >
          { props.user.certified &&
            <Label bsStyle="primary">certified</Label>
          }
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
        { estimates[0] && estimates[0].total }
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
          {
            props.onClickCertify && !props.user.certified &&
            <Button bsStyle="danger" onClick={e => props.onClickCertify(e, props.user)}>
              Certify
            </Button>
          }
          {
            props.onClickDecertify && props.user.certified &&
            <Button bsStyle="danger" onClick={e => props.onClickDecertify(e, props.user)}>
              De-Certify
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
  onClick: PropTypes.func.isRequired,
  onClickInvite: PropTypes.func,
  onClickAward: PropTypes.func,
  onClickReject: PropTypes.func,
  onClickCertify: PropTypes.func,
  onClickDecertify: PropTypes.func,
};

View.defaultProps = {
  jobId: undefined,
  onClickInvite: undefined,
  onClickAward: undefined,
  onClickReject: undefined,
  onClickCertify: undefined,
  onClickDecertify: undefined,
};

View.contextTypes = {
  store: PropTypes.object,
};

export default View;
