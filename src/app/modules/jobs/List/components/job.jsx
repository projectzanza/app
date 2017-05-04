import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ButtonToolbar,
} from 'react-bootstrap';
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

JobView.propTypes = {
  job: Job.propTypes.isRequired,
  onClick: PropTypes.func.isRequired,
  onClickRegisterInterest: PropTypes.func,
  allowRegisterInterest: PropTypes.bool,
  onClickAccept: PropTypes.func,
};

JobView.defaultProps = {
  allowRegisterInterest: false,
  onClickRegisterInterest: undefined,
  onClickAccept: undefined,
};

export default JobView;
