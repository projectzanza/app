import _ from 'lodash';

// places an entity, such as a job, user etc, into the entities property
// entity should have an id
// state - redux state
// data - array of entities
export const createEntityEntries = (state, data) => {
  const newEntities = data.reduce(
    (entities, entity) => Object.assign(entities, { [entity.id]: entity }),
    {},
  );

  const entitiesState = Object.assign(
    {},
    state.entities,
    newEntities,
  );

  return Object.assign(
    {},
    state,
    { entities: entitiesState },
  );
};

const determineNewForeignKeySet = (state, primaryKey, foreignKeys, action) => {
  switch (action) {
    case 'merge':
      return _.union(state.entities[primaryKey], foreignKeys);
    case 'purge':
      return _.difference(state.entities[primaryKey], foreignKeys);
    case 'reset':
    default:
      return foreignKeys;
  }
};

// sets a primaryKey as the property name for a list of foreignKeys
// eg. {'1' => ['5', '6', '7']}
// should be used by a reducer, so the state already references the correct bucket eg 'userJobs'
// pk would be user id, foreignKeys would be job ids
export const updateJoinTableState = (state, primaryKey, foreignKeys, action) => {
  const foreignKeysAry = [].concat(foreignKeys);
  const entities = Object.assign(
    {},
    state.entities,
    { [primaryKey]: determineNewForeignKeySet(state, primaryKey, foreignKeysAry, action) },
  );

  return Object.assign(
    {},
    state,
    { entities },
  );
};

export const deleteEntityEntries = (state, primaryKeys) => {
  const { entities } = state;
  const pks = [].concat(primaryKeys);
  pks.map(pk => delete entities[pk]);

  return Object.assign(
    {},
    state,
    { entities },
  );
};
