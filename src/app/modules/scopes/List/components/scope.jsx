import React from 'react';
import PropTypes from 'prop-types';
import {
  ButtonToolbar,
  Button,
} from 'react-bootstrap';
import Scope from '../../model';

const ScopeView = props => (
  <tr>
    <td>
      { props.scope.title }
    </td>
    <td>
      { props.scope.description }
    </td>
    <td>
      <ButtonToolbar>
        { props.canClickComplete(props.scope) &&
          <Button
            bsStyle="primary"
            onClick={e => props.onClickComplete(e, props.scope)}
          > Complete </Button>
        }
        { props.canClickVerify(props.scope) &&
          <Button
            bsStyle="primary"
            onClick={e => props.onClickVerify(e, props.scope)}
          > Verify </Button>
        }
        { props.canClickReject(props.scope) &&
          <Button
            bsStyle="danger"
            onClick={e => props.onClickReject(e, props.scope)}
          > Reject </Button>
        }
      </ButtonToolbar>
    </td>
  </tr>

);

ScopeView.propTypes = {
  scope: Scope.propTypes.isRequired,
  canClickComplete: PropTypes.func.isRequired,
  onClickComplete: PropTypes.func.isRequired,
  canClickVerify: PropTypes.func.isRequired,
  onClickVerify: PropTypes.func.isRequired,
  canClickReject: PropTypes.func.isRequired,
  onClickReject: PropTypes.func.isRequired,
};

export default ScopeView;
