import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
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

  acceptedUser(store) {
    return _.filter(
      this.collaboratingUsers(store),
      ['meta.job.collaboration_state', 'accepted'],
    )[0];
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

  reviews(store, userId) {
    const reviews = getJoinEntities({
      store,
      primaryKey: this.id,
      joinTable: 'jobReviews',
      entityTable: 'reviews',
    });
    if (userId) {
      return _.filter(reviews, { user_id: userId });
    }
    return reviews;
  }
}

/* eslint-disable camelcase */
Job.defaults = {
  title: title => title || '',
  text: text => text || '',
  tag_list: tag_list => tag_list || [],
  per_diem: per_diem => per_diem || { min: 0, max: 1000 },
  proposed_start_at: proposed_start_at => moment(proposed_start_at) || moment(),
  proposed_end_at: proposed_end_at => moment(proposed_end_at) || moment(),
  consultant_filter: value => Job.convertHashToBool(value, ['onsite']) || { country: '', city: '', name: '', onsite: false },
};
/* eslint-enable camelcase */

Job.consultantFilterPropType = PropTypes.shape({
  country: PropTypes.string,
  city: PropTypes.string,
  name: PropTypes.string,
  onsite: PropTypes.bool,
});

Job.propTypes = PropTypes.shape({
  title: PropTypes.string,
  text: PropTypes.string,
  tag_list: PropTypes.arrayOf(PropTypes.string),
  per_diem: PropTypes.shape({
    min: PropTypes.int,
    max: PropTypes.int,
  }),
  matchingUsers: PropTypes.func,
  consultant_filter: Job.consultantFilterPropType,
});

Job.table = 'jobs';
