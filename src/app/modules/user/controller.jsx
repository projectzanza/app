import {
  postInviteToJob,
  getMatchingUsersForJob,
  getInvitedUsersForJob,
  getInterestedUsersForJob,
} from './actions';
import User from './model';

class UserController {
  static currentUser(store) {
    const { user } = store.getState();
    if (user.currentUser) {
      return User.find(store, user.currentUser);
    }
    return undefined;
  }

  static isCurrentUser(store, user) {
    return UserController.currentUser(store).id === user.id;
  }

  static inviteUser(store, jobId, userId) {
    return store.dispatch(
      postInviteToJob({
        jobId,
        userId,
      }),
    );
  }

  static fetchMatchingUsersForJob(store, jobId) {
    return store.dispatch(getMatchingUsersForJob({ jobId }));
  }

  static fetchInvitedUsersForJob(store, jobId) {
    return store.dispatch(getInvitedUsersForJob({ jobId }));
  }

  static fetchInterestedUsersForJob(store, jobId) {
    return store.dispatch(getInterestedUsersForJob({ jobId }));
  }
}


export default UserController;
