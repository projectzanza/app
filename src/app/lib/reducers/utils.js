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
  let newEntities = data.reduce(
    (entities, entity) => (
      Object.assign(entities, { [entity.id]: entity })
    ),
    {},
  );

  let entitiesState = Object.assign(
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
  return Object.assign(
    {},
    state,
    { [primaryKey]: foreignKeys }
  );
};
