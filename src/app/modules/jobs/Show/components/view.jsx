import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate } from 'react-intl';
import {
  ButtonToolbar,
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
      <dt>State</dt>
      <dd>{props.job.state}</dd>
    </dl>
    <ButtonToolbar>

      { props.showEdit &&
      <Button
        bsStyle="primary"
        onClick={() => props.onEdit(props.job)}
      > Edit
      </Button>
      }

      { props.showRegisterInterest &&
      <Button
        bsStyle="primary"
        onClick={e => props.onClickRegisterInterest(e)}
      > Register Interest
      </Button>
      }

      { props.onClickAccept &&
        <Button
          bsStyle="primary"
          onClick={e => props.onClickAccept(e)}
        > Accept Job
        </Button>
      }

      { props.onClickVerify &&
        <Button
          bsStyle="danger"
          onClick={e => props.onClickVerify(e)}
        > Verify Complete
        </Button>
      }
    </ButtonToolbar>
  </div>
);

View.propTypes = {
  job: Job.propTypes.isRequired,
  showEdit: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  showRegisterInterest: PropTypes.bool,
  onClickRegisterInterest: PropTypes.func.isRequired,
  onClickAccept: PropTypes.func,
  onClickVerify: PropTypes.func,
};

View.defaultProps = {
  showEdit: false,
  showRegisterInterest: false,
  onClickAccept: undefined,
  onClickVerify: undefined,
};

export default View;

