export function currentUser(store) {
  const { user } = store.getState();
  if (user.currentUser) {
    return user.items[user.currentUser];
  }
  return undefined;
}

export function selectedUser(store, userId) {
  return store.getState().user.items[userId];
}
