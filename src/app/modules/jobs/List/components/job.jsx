import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ButtonToolbar,
  Label,
} from 'react-bootstrap';
import _ from 'lodash';
import Job from '../../model';

const View = (props, context) => {
  const { store } = context;
  const estimate = props.job.estimate(store, props.userId);
  const collaborationState = _.get(props.job, 'meta.current_user.collaboration_state');

  return (
    <tr>
      <td>
        <Button block className="clear" onClick={e => props.onClick(e, props.job)} >
          <Label bsStyle="primary">{ props.job.state }</Label>
          {
            collaborationState &&
            <Label bsStyle="success"> { collaborationState } </Label>
          }
          &nbsp;
          { props.job.title }
        </Button>
      </td>
      <td>
        <Button block className="clear" onClick={e => props.onClick(e, props.job)} >
          { props.job.text }
        </Button>
      </td>
      <td>
        { estimate && estimate.total }
      </td>
      { (props.allowRegisterInterest || props.onClickAccept) &&
      <td>
        <ButtonToolbar>
          {
            props.allowRegisterInterest &&
            <Button onClick={e => props.onClickRegisterInterest(e, props.job)}>
              Register Interest
            </Button>
          }
          {
            props.onClickAccept &&
            <Button onClick={e => props.onClickAccept(e, props.job)}>
              Accept
            </Button>
          }
        </ButtonToolbar>
      </td>
      }
    </tr>
  );
};

View.propTypes = {
  job: Job.propTypes.isRequired,
  userId: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onClickRegisterInterest: PropTypes.func,
  allowRegisterInterest: PropTypes.bool,
  onClickAccept: PropTypes.func,
};

View.defaultProps = {
  userId: undefined,
  allowRegisterInterest: false,
  onClickRegisterInterest: undefined,
  onClickAccept: undefined,
};

View.contextTypes = {
  store: PropTypes.object,
};

export default View;
