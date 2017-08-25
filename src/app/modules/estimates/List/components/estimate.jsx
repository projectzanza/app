import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, Button } from 'react-bootstrap';
import Estimate from '../../model';
import '../../style.scss';

const EstimateView = props => (
  <tr className={props.estimate.state}>
    <td> Days {props.estimate.days}</td>
    <td> Start Date {props.estimate.start_at}</td>
    <td> End Date {props.estimate.end_at}</td>
    <td> Per Diem {props.estimate.per_diem}</td>
    <td> Total {props.estimate.total}</td>
    <td>
      <ButtonToolbar>
        { props.onClickEdit(props.estimate) &&
          <Button onClick={() => props.onClickEdit(props.estimate)}> Edit </Button>
        }
        { props.onClickDelete(props.estimate) &&
          <Button
            bsStyle="danger"
            onClick={() => props.onClickDelete(props.estimate)}
          > Delete </Button>
        }
        { props.onClickAccept(props.estimate) &&
          <Button
            bsStyle="primary"
            onClick={() => props.onClickAccept(props.estimate)()}
          > Accept </Button>
        }
        { props.onClickReject(props.estimate) &&
          <Button
            bsStyle="danger"
            onClick={() => props.onClickReject(props.estimate)()}
          > Reject </Button>
        }
      </ButtonToolbar>
    </td>
  </tr>
  );

EstimateView.propTypes = {
  estimate: Estimate.propTypes.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onClickAccept: PropTypes.func.isRequired,
  onClickReject: PropTypes.func.isRequired,
};
export default EstimateView;
