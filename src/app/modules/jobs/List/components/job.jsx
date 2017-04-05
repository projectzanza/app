import React from 'react';
import { Button } from 'react-bootstrap';
import JobPropType from '../../../job/propTypes';

const Job = props => (
  <Button block onClick={e => props.onClick(e, props.job)} >
    <dl className="dl-horizontal">
      <dt>{ props.job.title }</dt>
      <dd>{ props.job.text }</dd>
    </dl>
  </Button>
);

Job.propTypes = {
  job: JobPropType.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

export default Job;
