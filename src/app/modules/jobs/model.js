import PropTypes from 'prop-types';
import _ from 'lodash';
import Model from '../../lib/store/model';
import { getJoinEntities } from '../../lib/store/utils';

export default class Job extends Model {
  matchingUsers(store) {
    return getJoinEntities({
      store,
      primaryKey: this.id,
      joinTable: 'jobMatchingUsers',
      entityTable: 'user',
    });
  }

  collaboratingUsers(store) {
    return getJoinEntities({
      store,
      primaryKey: this.id,
      joinTable: 'jobCollaboratingUsers',
      entityTable: 'user',
    });
  }

  invitedUsers(store) {
    return _.filter(
      this.collaboratingUsers(store),
      ['meta.job.collaboration_state', 'invited'],
    );
  }

  interestedUsers(store) {
    return _.filter(
      this.collaboratingUsers(store),
      ['meta.job.collaboration_state', 'interested'],
    );
  }

  prospectiveUsers(store) {
    return _.filter(
      this.collaboratingUsers(store),
      ['meta.job.collaboration_state', 'prospective'],
    );
  }

  awardedUsers(store) {
    return _.filter(
      this.collaboratingUsers(store),
      ['meta.job.collaboration_state', 'awarded'],
    );
  }

  participatingUsers(store) {
    return _.filter(
      this.collaboratingUsers(store),
      ['meta.job.collaboration_state', 'participant'],
    );
  }

  scopes(store) {
    return getJoinEntities({
      store,
      primaryKey: this.id,
      joinTable: 'jobScopes',
      entityTable: 'scopes',
    });
  }

  estimates(store, userId) {
    const jobEstimateIds = getJoinEntities({
      store,
      primaryKey: this.id,
      joinTable: 'jobEstimates',
      entityTable: 'estimates',
    });

    const userEstimateIds = getJoinEntities({
      store,
      primaryKey: userId,
      joinTable: 'userEstimates',
      entityTable: 'estimates',
    });
    return _.intersection(jobEstimateIds, userEstimateIds);
  }
}

Job.defaults = {
  title: title => title || '',
  text: text => text || '',
  tag_list: tag_list => tag_list || [],         // eslint-disable-line camelcase
  per_diem: per_diem => per_diem || { min: 0, max: 1000 },  // eslint-disable-line camelcase
  proposed_start_at: proposed_start_at => proposed_start_at || 0,   // eslint-disable-line camelcase
  proposed_end_at: proposed_end_at => proposed_end_at || 0, // eslint-disable-line camelcase
};

Job.propTypes = PropTypes.shape({
  title: PropTypes.string,
  text: PropTypes.string,
  tag_list: PropTypes.arrayOf(
      PropTypes.string,
    ),
  per_diem: PropTypes.shape({
    min: PropTypes.int,
    max: PropTypes.int,
  }),
  matchingUsers: PropTypes.func,
});

Job.table = 'jobs';
