import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  Button,
} from 'react-bootstrap';
import User from '../../model';
import TagInput from '../../../../components/TagInput/container';

const View = props => (
  <div>
    <dl className="dl-horizontal">
      <dt>Avatar</dt>
      <dd><img src={props.user.avatar_url} alt="avatar" /></dd>
      <dt>Name</dt>
      <dd>{props.user.name}</dd>
      <dt>Headline</dt>
      <dd>{props.user.headline}</dd>
      <dt>Summary</dt>
      <dd>{props.user.summary}</dd>
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
      { props.showEdit &&
        <Button
          bsStyle="primary"
          onClick={() => props.onEdit(props.user)}
        >Edit</Button>
      }
      { props.showInvite &&
      <Button
        bsStyle="primary"
        onClick={e => props.onClickInvite(e)}
      >Invite
      </Button>
      }
    </FormGroup>
  </div>
);

View.propTypes = {
  user: User.propTypes,
  onEdit: PropTypes.func.isRequired,
  showEdit: PropTypes.bool,
  showInvite: PropTypes.bool,
  onClickInvite: PropTypes.func.isRequired,
};

View.defaultProps = {
  showEdit: false,
  showInvite: false,
  user: new User(),
};

export default View;
