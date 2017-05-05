import { Types } from './join-actions';
import { updateJoinTableState } from './utils';

export const initialState = {
  entities: {},
};

export const jobCollaboratingUsers = (state = initialState, action) => {
  switch (action.type) {
    case Types.JOB_COLLABORATING_USERS:
      return updateJoinTableState(state, action.jobId, action.userIds, action.joinAction);
    default:
      return state;
  }
};

export const userCollaboratingJobs = (state = initialState, action) => {
  switch (action.type) {
    case Types.USER_COLLABORATING_JOBS:
      return updateJoinTableState(state, action.userId, action.jobIds, action.joinAction);
    default:
      return state;
  }
};
