import React from 'react';
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

  invitedUsers(store) {
    return getJoinEntities({
      store,
      primaryKey: this.id,
      joinTable: 'jobInvitedUsers',
      entityTable: 'user',
    });
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

Job.propTypes = React.PropTypes.shape({
  title: React.PropTypes.string,
  text: React.PropTypes.string,
  tag_list: React.PropTypes.arrayOf(
      React.PropTypes.string,
    ),
  per_diem: React.PropTypes.shape({
    min: React.PropTypes.int,
    max: React.PropTypes.int,
  }),
  matchingUsers: React.PropTypes.func,
});

Job.table = 'jobs';
