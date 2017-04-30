import { Types } from './join-actions';
import { updateJoinTableState } from './utils';

export const initialState = {
  entities: {},
};

export const userInterestedJobs = (state = initialState, action) => {
  switch (action.type) {
    case Types.USER_INTERESTED_IN_JOBS:
      return updateJoinTableState(state, action.userId, action.jobIds);
    default:
      return state;
  }
};

export const jobInterestedUsers = (state = initialState, action) => {
  switch (action.type) {
    case Types.JOB_INTERESTED_USERS:
      return updateJoinTableState(state, action.jobId, action.userIds);
    default:
      return state;
  }
};
