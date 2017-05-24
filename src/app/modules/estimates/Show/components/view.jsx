import React from 'react';
import PropTypes from 'prop-types';
import {
  ButtonToolbar,
  Button,
} from 'react-bootstrap';
import Estimate from '../../model';


const View = props => (
  <div>
    <dl className="dl-horizontal">
      <dt> Days </dt><dd>{props.estimate.days}</dd>
      <dt> Start Date </dt><dd>{props.estimate.start_at}</dd>
      <dt> End Date </dt><dd>{props.estimate.end_at}</dd>
      <dt> Per Diem </dt><dd>{props.estimate.per_diem}</dd>
      <dt> Total </dt><dd>{props.estimate.total}</dd>
    </dl>
    <ButtonToolbar>
      <Button
        onClick={e => props.onClickEdit(e)}
        bsStyle="primary"
      >Edit
      </Button>
    </ButtonToolbar>
  </div>
);

View.propTypes = {
  estimate: Estimate.propTypes,
  onClickEdit: PropTypes.func.isRequired,
};

View.defaultProps = {
  estimate: new Estimate(),
};

export default View;
