import PropTypes from 'prop-types';
import Model from '../../lib/store/model';

export default class Review extends Model {
}

Review.propTypes = PropTypes.shape({
  user_id: PropTypes.string,
  subject_id: PropTypes.string,
  job_id: PropTypes.string,
  description: PropTypes.string,
  ability: PropTypes.number,
  communication: PropTypes.number,
  speed: PropTypes.number,
  overall: PropTypes.number,
});

Review.defaults = {
  description: value => value || '',
  ability: value => value || 0,
  communication: value => value || 0,
  speed: value => value || 0,
  overall: value => value || 0,
};
