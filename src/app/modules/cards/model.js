import PropTypes from 'prop-types';
import Model from '../../lib/store/model';

export default class Card extends Model {
}

Card.defaults = {
};

Card.propTypes = PropTypes.shape({
  brand: PropTypes.string,
  last4: PropTypes.string,
  exp_year: PropTypes.string,
});

Card.table = 'cards';
