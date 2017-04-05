import React from 'react';
import {
  FormGroup,
  Button,
} from 'react-bootstrap';
import TagInput from '../../../../components/TagInput/container';
import JobPropTypes from '../../propTypes';

const View = props => (
  <div>
    <dl className="dl-horizontal">
      <dt>Title</dt>
      <dd>{props.job.title}</dd>
      <dt>Description</dt>
      <dd>{props.job.text}</dd>
      <dt>Day Rate</dt>
      <dd>{props.job.per_diem.min} - {props.job.per_diem.max}</dd>
      <dt>Tags</dt>
      <dd>
        <TagInput
          mode="view"
          value={props.job.tag_list}
        />
      </dd>
    </dl>
    <FormGroup>
      <Button
        bsStyle="primary"
        onClick={() => props.onEdit(props.job)}
      > Edit
      </Button>
    </FormGroup>
  </div>
);

View.propTypes = {
  job: JobPropTypes.isRequired,
  onEdit: React.PropTypes.func.isRequired,
};

export default View;

