import React from 'react';
import {
  FormGroup,
  Button,
} from 'react-bootstrap';
import UserPropTypes from '../../propTypes';
import TagInput from '../../../../components/TagInput/container';

const View = props => (
  <div>
    <dl className="dl-horizontal">
      <dt>Name</dt>
      <dd>{props.user.name}</dd>
      <dt>Bio</dt>
      <dd>{props.user.bio}</dd>
      <dt>Day Rate</dt>
      <dd>{props.user.per_diem.min} - {props.user.per_diem.max}</dd>
      <dt>Tags</dt>
      <dd>
        <TagInput
          mode="view"
          value={props.user.tag_list}
        />
      </dd>
    </dl>
    <FormGroup>
      <Button
        bsStyle="primary"
        onClick={() => props.onEdit(props.user)}
      > Edit
      </Button>
    </FormGroup>
  </div>
);

View.propTypes = {
  user: UserPropTypes.isRequired,
  onEdit: React.PropTypes.func.isRequired,
};

export default View;
