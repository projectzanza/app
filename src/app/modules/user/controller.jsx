import _ from 'lodash';
import * as actions from './actions';
import User from './model';

class UserController {
  static currentUser(store) {
    const { user } = store.getState();
    const foundUser = User.find(store, user.currentUser);

    // since user is serialised, the class is not persisted in the localStorage, only the attributes
    // so we have to generate a class out of it again if we want it
    if (foundUser && foundUser instanceof User) {
      return foundUser;
    } else if (foundUser) {
      return new User(foundUser);
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

  static fetchMatchingUsersForJob(store, jobId, filter) {
    return store.dispatch(actions.getMatchingUsersForJob(jobId, filter));
  }

  static fetchCollaboratingUsersForJob(store, jobId, filter) {
    return store.dispatch(actions.getCollaboratingUsersForJob(jobId, filter));
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

  static sortByCollaborationState(...args) {
    const items = [].reduce.call(args, (list, item) => list.concat(item), []);
    return _.uniq(_.sortBy(
      items,
      item => ['participating', 'awarded', 'invited', 'interested', undefined]
        .indexOf(_.get(item, 'meta.job.collaboration_state')),
    ));
  }
}


export default UserController;
