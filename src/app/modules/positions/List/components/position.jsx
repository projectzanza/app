import React from 'react';
// import PropTypes from 'prop-types';
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
  </tr>
);

PositionView.propTypes = {
  position: Position.propTypes.isRequired,
};

export default PositionView;
