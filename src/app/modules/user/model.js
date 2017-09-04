import PropTypes from 'prop-types';
import _ from 'lodash';
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

  collaboratingJobs(store) {
    return getJoinEntities({
      store,
      primaryKey: this.id,
      joinTable: 'userCollaboratingJobs',
      entityTable: 'jobs',
    });
  }

  invitedToJobs(store) {
    return _.filter(
      this.collaboratingJobs(store),
      ['meta.current_user.collaboration_state', 'invited'],
    );
  }

  interestedInJobs(store) {
    return _.filter(
      this.collaboratingJobs(store),
      ['meta.current_user.collaboration_state', 'interested'],
    );
  }

  awardedJobs(store) {
    return _.filter(
      this.collaboratingJobs(store),
      ['meta.current_user.collaboration_state', 'awarded'],
    );
  }

  acceptedJobs(store) {
    return _.filter(
      this.collaboratingJobs(store),
      ['meta.current_user.collaboration_state', 'accepted'],
    );
  }

  estimates(store, jobId) {
    const jobEstimateIds = getJoinEntities({
      store,
      primaryKey: jobId,
      joinTable: 'jobEstimates',
      entityTable: 'estimates',
    });

    const userEstimateIds = getJoinEntities({
      store,
      primaryKey: this.id,
      joinTable: 'userEstimates',
      entityTable: 'estimates',
    });
    return _.intersection(jobEstimateIds, userEstimateIds);
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
