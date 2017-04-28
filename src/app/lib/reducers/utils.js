export function overrideNull(initialState, state) {
  const nextState = Object.assign({}, state);
  Object.keys(nextState).forEach((key) => {
    if (nextState[key] === null) {
      nextState[key] = initialState[key];
    }
  });
  return nextState;
}

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

// sets a primaryKey as the property name for a list of foreignKeys
// eg. {'1' => ['5', '6', '7']}
// should be used by a reducer, so the state already references the correct bucket eg 'userJobs'
// pk would be user id, foreignKeys would be job ids
export const updateJoinTableState = (state, primaryKey, foreignKeys) => {
  const entities = Object.assign(
    {},
    state.entities,
    { [primaryKey]: foreignKeys },
  );

  return Object.assign(
    {},
    state,
    { entities },
  );
};
