import React from 'react';
import { FormattedDate } from 'react-intl';
import {
  FormGroup,
  Button,
} from 'react-bootstrap';
import TagInput from '../../../../components/TagInput/container';
import Job from '../../model';

const View = props => (
  <div>
    <dl className="dl-horizontal">
      <dt>Title</dt>
      <dd>{props.job.title}</dd>
      <dt>Description</dt>
      <dd>{props.job.text}</dd>
      <dt>Day Rate</dt>
      <dd>{props.job.per_diem.min} - {props.job.per_diem.max}</dd>
      <dt>Proposed State Date</dt>
      <dd><FormattedDate value={props.job.proposed_start_at} /></dd>
      <dt>Proposed End Date</dt>
      <dd><FormattedDate value={props.job.proposed_end_at} /></dd>
      <dt>Tags</dt>
      <dd>
        <TagInput
          mode="view"
          value={props.job.tag_list}
        />
      </dd>
      <dt>Contact Me</dt>
      <dd>{props.job.allow_contact ? 'True' : 'False'}</dd>
    </dl>
    <FormGroup>
      { props.showEdit &&
      <Button
        bsStyle="primary"
        onClick={() => props.onEdit(props.job)}
      > Edit
      </Button>
      }
    </FormGroup>
  </div>
);

View.propTypes = {
  job: Job.propTypes.isRequired,
  showEdit: React.PropTypes.bool,
  onEdit: React.PropTypes.func.isRequired,
};

View.defaultProps = {
  showEdit: false,
};

export default View;

