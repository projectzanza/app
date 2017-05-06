import _ from 'lodash';
import * as actions from './actions';
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
      actions.postInviteToJob({
        jobId,
        userId,
      }),
    );
  }

  static fetchMatchingUsersForJob(store, jobId) {
    return store.dispatch(actions.getMatchingUsersForJob({ jobId }));
  }

  static fetchCollaboratingUsersForJob(store, jobId) {
    return store.dispatch(actions.getCollaboratingUsersForJob({ jobId }));
  }

  static fetchUser(store, userId, jobId) {
    return store.dispatch(actions.getUser(userId, jobId));
  }

  static showInviteToJob(props) {
    return (_.get(props.job, 'user_id') === UserController.currentUser(props.store).id) &&
      (_.includes([undefined, 'interested'], _.get(props.user, 'meta.job.collaboration_state')));
  }

  static awardJob(store, jobId, userId) {
    return store.dispatch(actions.postAwardJob({ userId, jobId }));
  }

  static rejectUser(store, jobId, userId) {
    return store.dispatch(actions.postRejectUser({ userId, jobId }));
  }
}


export default UserController;
