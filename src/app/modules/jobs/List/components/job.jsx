import React from 'react';
import { Button } from 'react-bootstrap';
import Job from '../../model';

const JobView = props => (
  <Button block onClick={e => props.onClick(e, props.job)} >
    <dl className="dl-horizontal">
      <dt>{ props.job.title }</dt>
      <dd>{ props.job.text }</dd>
    </dl>
  </Button>
);

JobView.propTypes = {
  job: Job.propTypes.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

export default JobView;
