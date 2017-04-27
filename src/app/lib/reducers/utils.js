export function overrideNull(initialState, state) {
  const nextState = Object.assign({}, state);
  Object.keys(nextState).forEach((key) => {
    if (nextState[key] === null) {
      nextState[key] = initialState[key];
    }
  });
  return nextState;
}

export const createEntityEntries = (state, data) => {
  const newEntities = data.reduce(
    (entities, entity) => (
      Object.assign(entities, { [entity.id]: entity })
    ),
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
