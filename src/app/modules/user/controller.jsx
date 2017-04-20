class UserController {
  static currentUser(store) {
    const { user } = store.getState();
    if (user.currentUser) {
      return user.items[user.currentUser];
    }
    return undefined;
  }

  static isCurrentUser(store, user) {
    return UserController.currentUser(store).id === user.id;
  }
}


export default UserController;
