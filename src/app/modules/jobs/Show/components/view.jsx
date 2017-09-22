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

      { props.onEdit(props.job) &&
      <Button
        bsStyle="primary"
        onClick={props.onEdit(props.job)}
      > Edit
      </Button>
      }

      { props.onClickRegisterInterest() &&
      <Button
        bsStyle="primary"
        onClick={props.onClickRegisterInterest()}
      > Register Interest
      </Button>
      }

      { props.onClickAccept() &&
        <Button
          bsStyle="primary"
          onClick={props.onClickAccept()}
        > Accept Job
        </Button>
      }

      { props.onClickComplete() &&
      <Button
        bsStyle="primary"
        onClick={props.onClickComplete()}
      > Complete
      </Button>
      }

      { props.onClickVerify() &&
        <Button
          bsStyle="danger"
          onClick={props.onClickVerify()}
        > Verify Complete
        </Button>
      }
    </ButtonToolbar>
  </div>
);

View.propTypes = {
  job: Job.propTypes.isRequired,
  onEdit: PropTypes.func,
  onClickRegisterInterest: PropTypes.func,
  onClickAccept: PropTypes.func,
  onClickVerify: PropTypes.func,
  onClickComplete: PropTypes.func,
};

View.defaultProps = {
  onEdit: undefined,
  onClickRegisterInterest: undefined,
  onClickAccept: undefined,
  onClickVerify: undefined,
  onClickComplete: undefined,
};

export default View;

