import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Job from '../../model';

const JobView = props => (
  <tr>
    <td>
      <Button block className="clear" onClick={e => props.onClick(e, props.job)} >
        { props.job.title }
      </Button>
    </td>
    <td>
      <Button block className="clear" onClick={e => props.onClick(e, props.job)} >
        { props.job.text }
      </Button>
    </td>
    { props.onClickRegisterInterest &&
      <td>
        <Button onClick={e => props.onClickRegisterInterest(e, props.job)}>
          Register Interest
        </Button>
      </td>
    }
  </tr>
);

JobView.propTypes = {
  job: Job.propTypes.isRequired,
  onClick: PropTypes.func.isRequired,
  onClickRegisterInterest: PropTypes.func,
};

JobView.defaultProps = {
  onClickRegisterInterest: undefined,
};

export default JobView;
