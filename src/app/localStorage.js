export const loadState = () => {
  try {
    const state = localStorage.getItem('state');
    if (state === null) {
      return undefined;
    }
    return state;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    localStorage.setItem('state', state);
  } catch (err) {
    // ignore it
  }
};
