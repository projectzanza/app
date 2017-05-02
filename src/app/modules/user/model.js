import PropTypes from 'prop-types';
import { getJoinEntities } from '../../lib/store/utils';
import Model from '../../lib/store/model';

export default class User extends Model {
  jobs(store) {
    return getJoinEntities({
      store,
      primaryKey: this.id,
      joinTable: 'userJobs',
      entityTable: 'jobs' });
  }

  matchingJobs(store) {
    return getJoinEntities({
      store,
      primaryKey: this.id,
      joinTable: 'userMatchingJobs',
      entityTable: 'jobs',
    });
  }

  invitedToJobs(store) {
    return getJoinEntities({
      store,
      primaryKey: this.id,
      joinTable: 'userInvitedJobs',
      entityTable: 'jobs',
    });
  }

  interestedInJobs(store) {
    return getJoinEntities({
      store,
      primaryKey: this.id,
      joinTable: 'userInterestedJobs',
      entityTable: 'jobs',
    });
  }

  awardedJobs(store) {
    return getJoinEntities({
      store,
      primaryKey: this.id,
      joinTable: 'userAwardJobs',
      entityTable: 'jobs',
    });
  }
}

User.defaults = {
  tag_list: tag_list => tag_list || [],         // eslint-disable-line camelcase
  per_diem: per_diem => per_diem || { min: 0, max: 1000 },  // eslint-disable-line camelcase
};

User.propTypes =
  PropTypes.shape({
    name: PropTypes.string,
    bio: PropTypes.string,
    tag_list: PropTypes.arrayOf(
      PropTypes.string,
    ),
    per_diem: PropTypes.shape({
      min: PropTypes.int,
      max: PropTypes.int,
    }),
  });

User.table = 'user';
