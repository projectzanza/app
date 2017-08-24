import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, Button } from 'react-bootstrap';
import Estimate from '../../model';

const EstimateView = props => (
  <tr>
    <td> Days {props.estimate.days}</td>
    <td> Start Date {props.estimate.start_at}</td>
    <td> End Date {props.estimate.end_at}</td>
    <td> Per Diem {props.estimate.per_diem}</td>
    <td> Total {props.estimate.total}</td>
    <td>
      <ButtonToolbar>
        <Button onClick={() => props.onClickEdit(props.estimate)}> Edit </Button>
        <Button
          bsStyle="danger"
          onClick={() => props.onClickDelete(props.estimate)}
        > Delete </Button>
      </ButtonToolbar>
    </td>
  </tr>
  );

EstimateView.propTypes = {
  estimate: Estimate.propTypes.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};
export default EstimateView;
