import PropTypes from 'prop-types';
import Model from '../../lib/store/model';

export default class Position extends Model {

}

Position.propTypes = PropTypes.shape({
  title: PropTypes.string,
  summary: PropTypes.string,
  company: PropTypes.string,
  start_at: PropTypes.string,
  end_at: PropTypes.string,
});

Position.defaults = {
  title: value => value || '',
  summary: value => value || '',
  company: value => value || '',
  start_at: value => value || '',
  end_at: value => value || '',
};
