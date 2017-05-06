import PropTypes from 'prop-types';
import Model from '../../lib/store/model';

export default class Scope extends Model {

}

Scope.states = {
  open: 'open',
  completed: 'completed',
  verified: 'verified',
  rejected: 'rejected',
};

Scope.propTypes = PropTypes.shape({
  title: PropTypes.string,
  description: PropTypes.string,
});

Scope.defaults = {
  title: value => value || '',
  description: value => value || '',
};
