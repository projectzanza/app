import React from 'react';
import PropTypes from 'prop-types';
import {
  ButtonToolbar,
  Button,
} from 'react-bootstrap';
import Position from '../../model';

const PositionView = props => (
  <tr>
    <td>
      { props.position.title }
    </td>
    <td>
      { props.position.company }
    </td>
    <td>
      { props.position.summary }
    </td>
    <td>
      { props.position.start_at }
    </td>
    <td>
      { props.position.end_at }
    </td>
    <td>
      <ButtonToolbar>
        { props.onClickEdit(props.position) &&
          <Button
            onClick={() => props.onClickEdit(props.position)()}
          > Edit </Button>
        }
        { props.onClickDelete(props.position) &&
        <Button
          bsStyle="danger"
          onClick={() => props.onClickDelete(props.position)()}
        > Delete </Button>
        }
      </ButtonToolbar>
    </td>
  </tr>
);

PositionView.propTypes = {
  position: Position.propTypes.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};

export default PositionView;
