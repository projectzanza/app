import { Types } from './join-actions';
import { updateJoinTableState } from './utils';

export const initialState = {
  entities: {},
};

export const jobAwardUser = (state = initialState, action) => {
  switch (action.type) {
    case Types.JOB_AWARD_USER:
      return updateJoinTableState(state, action.jobId, action.userId);
    default:
      return state;
  }
};

export const userAwardJobs = (state = initialState, action) => {
  switch (action.type) {
    case Types.USER_AWARD_JOBS:
      return updateJoinTableState(state, action.userId, action.jobIds);
    default:
      return state;
  }
};
