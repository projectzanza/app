export const getEntity = (store, bucketName, entityId) => {
  const bucket = store.getState()[bucketName];
  if (entityId in bucket.entities) {
    return bucket.entities[entityId];
  }
  return undefined;
};

// props.store
// props.primaryKey
// props.joinTable
// props.entityTable
export const getJoinEntities = (props) => {
  const joinTableState = props.store.getState()[props.joinTable];
  const entityTableState = props.store.getState()[props.entityTable];

  if (props.primaryKey in joinTableState.entities) {
    const entityIds = joinTableState.entities[props.primaryKey];
    return entityIds.map(entityId => entityTableState.entities[entityId]);
  }
  return [];
};
