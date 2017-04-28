import { Types } from './join-actions';
import { updateJoinTableState } from './utils';

export const initialState = {
  entities: {},
};

export const userMatchingJobs = (state = initialState, action) => {
  switch (action.type) {
    case Types.USER_MATCHING_JOBS:
      return updateJoinTableState(state, action.userId, action.jobIds);
    default:
      return state;
  }
};

export const jobMatchingUsers = (state = initialState, action) => {
  switch (action.type) {
    case Types.JOB_MATCHING_USERS:
      return updateJoinTableState(state, action.jobId, action.userIds);
    default:
      return state;
  }
};
