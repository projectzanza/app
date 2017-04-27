import { inviteToJob } from './actions';
import { getEntity } from '../../lib/store/utils';

class UserController {
  static currentUser(store) {
    const { user } = store.getState();
    if (user.currentUser) {
      return getEntity(store, 'user', user.currentUser);
    }
    return undefined;
  }

  static isCurrentUser(store, user) {
    return UserController.currentUser(store).id === user.id;
  }

  static inviteUser(store, jobId, userId, resultsId) {
    return store.dispatch(
      inviteToJob({
        jobId,
        userId,
        resultsId,
      }),
    );
  }
}


export default UserController;
