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
        { props.onClickEdit(props.scope) &&
        <Button
          onClick={() => props.onClickEdit(props.scope)()}
        > Edit
        </Button>
        }
        { props.onClickComplete(props.scope) &&
          <Button
            bsStyle="primary"
            onClick={() => props.onClickComplete(props.scope)()}
          > Complete
          </Button>
        }
        { props.onClickVerify(props.scope) &&
          <Button
            bsStyle="primary"
            onClick={() => props.onClickVerify(props.scope)()}
          > Verify
          </Button>
        }
        { props.onClickReject(props.scope) &&
          <Button
            bsStyle="danger"
            onClick={() => props.onClickReject(props.scope)()}
          > Reject
          </Button>
        }
        {
          props.onClickDelete(props.scope) &&
          <Button
            bsStyle="danger"
            onClick={() => props.onClickDelete(props.scope)()}
          > Delete
          </Button>
        }
      </ButtonToolbar>
    </td>
  </tr>

);

ScopeView.propTypes = {
  scope: Scope.propTypes.isRequired,
  onClickComplete: PropTypes.func.isRequired,
  onClickVerify: PropTypes.func.isRequired,
  onClickReject: PropTypes.func.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};

export default ScopeView;
