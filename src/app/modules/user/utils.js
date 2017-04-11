export function currentUser(store) {
  const { user } = store.getState();
  if (user.currentUser) {
    return user.items[user.currentUser];
  }
  return undefined;
}

export function isCurrentUser(store, user) {
  return currentUser(store).id === user.id;
}
