import PropTypes from 'prop-types';
import Model from '../../lib/store/model';

export default class Estimate extends Model {

}

Estimate.propTypes = PropTypes.shape({
  id: PropTypes.string,
  user_id: PropTypes.string,
  job_id: PropTypes.string,
  start_at: PropTypes.string,
  end_at: PropTypes.string,
  per_diem_cents: PropTypes.int,
  per_diem_currency: PropTypes.string,
  per_diem: PropTypes.string,
  total_cents: PropTypes.int,
  total_currency: PropTypes.string,
  total: PropTypes.string,
});

Estimate.table = 'estimates';
