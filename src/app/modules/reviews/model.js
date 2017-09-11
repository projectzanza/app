import PropTypes from 'prop-types';
import Model from '../../lib/store/model';

export default class Review extends Model {
}

Review.propTypes = PropTypes.shape({
  user_id: PropTypes.string,
  subject_id: PropTypes.string,
  job_id: PropTypes.string,
  description: PropTypes.string,
  ability: PropTypes.string,
  communication: PropTypes.string,
  speed: PropTypes.string,
  overall: PropTypes.string,
});

Review.defaults = {
  description: value => value || '',
  ability: value => value || '',
  communication: value => value || '',
  speed: value => value || '',
  overall: value => value || '',
};
