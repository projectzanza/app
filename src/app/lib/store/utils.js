import _ from 'lodash';

export const getEntity = (store, bucketName, entityId) => {
  const bucket = store.getState()[bucketName];
  if (entityId in bucket.entities) {
    return bucket.entities[entityId];
  }
  return undefined;
};

export const getEntities = (store, bucketName) => _.values(store.getState()[bucketName].entities);

const hasManyEntities = (primaryKey, joinTableState, entityTableState) => {
  if (joinTableState && primaryKey in joinTableState.entities) {
    const entityIds = joinTableState.entities[primaryKey];
    if (entityIds) {
      if (!(entityIds instanceof Array)) {
        throw new Error('this seems to be a hasOne association, trying to access hasMany');
      }

      return _.compact(entityIds.map(entityId => entityTableState.entities[entityId]));
    }
  }
  return [];
};

const hasOneEntity = (primaryKey, joinTableState, entityTableState) => {
  if (joinTableState && primaryKey in joinTableState.entities) {
    const entityId = joinTableState.entities[primaryKey];
    return entityTableState.entities[entityId];
  }
  return undefined;
};

// props.store
// props.primaryKey
// props.joinTable
// props.entityTable
// props.joinType: [hasMany, hasOne] (default, hasMany)
export const getJoinEntities = (props) => {
  const joinTableState = props.store.getState()[props.joinTable];
  const entityTableState = props.store.getState()[props.entityTable];
  if (props.joinType === 'hasOne') {
    return hasOneEntity(props.primaryKey, joinTableState, entityTableState);
  }
  return hasManyEntities(props.primaryKey, joinTableState, entityTableState);
};
