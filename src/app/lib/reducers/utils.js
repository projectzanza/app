export function overrideNull(initialState, state) {
  const nextState = Object.assign({}, state);
  Object.keys(nextState).forEach((key) => {
    if (nextState[key] === null) {
      nextState[key] = initialState[key];
    }
  });
  return nextState;
}

export const somethingElse = '';
