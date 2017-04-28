import React from 'react';
import { getJoinEntities, getEntity } from '../../lib/store/utils';
import Model from '../../lib/store/model';

export default class User extends Model {
  static find(store, id) {
    const entity = getEntity(store, 'user', id);
    if (entity) {
      return new User(entity);
    }
    return new User({ id, isLocal: false });
  }

  jobs(store) {
    return getJoinEntities({
      store,
      primaryKey: this.props.userId,
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
}

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
