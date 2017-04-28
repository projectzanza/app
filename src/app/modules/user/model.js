import React from 'react';
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
}

User.defaults = {
  tag_list: tag_list => tag_list || [],         // eslint-disable-line camelcase
  per_diem: per_diem => per_diem || { min: 0, max: 1000 },  // eslint-disable-line camelcase
};

User.propTypes =
  React.PropTypes.shape({
    name: React.PropTypes.string,
    bio: React.PropTypes.string,
    tag_list: React.PropTypes.arrayOf(
      React.PropTypes.string,
    ),
    per_diem: React.PropTypes.shape({
      min: React.PropTypes.int,
      max: React.PropTypes.int,
    }),
  });

User.table = 'user';
