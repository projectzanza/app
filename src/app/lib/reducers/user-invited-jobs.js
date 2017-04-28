import { Types } from './join-actions';
import { updateJoinTableState } from './utils';

export const initialState = {
  entities: {},
};

export const userInvitedJobs = (state = initialState, action) => {
  switch (action.type) {
    case Types.USER_INVITED_JOBS:
      return updateJoinTableState(state, action.userId, action.jobIds);
    default:
      return state;
  }
};

export const jobInvitedUsers = (state = initialState, action) => {
  switch (action.type) {
    case Types.JOB_INVITED_USERS:
      return updateJoinTableState(state, action.jobId, action.userIds);
    default:
      return state;
  }
};
