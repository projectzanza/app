import { Types } from './join-actions';
import { updateJoinTableState } from './utils';

export const initialState = {
  entities: {},
};

export const userJobs = (state = initialState, action) => {
  switch(action.type) {
    case Types.USER_JOBS:
      return updateJoinTableState(state, action.userId, action.jobIds);
    default:
      return state;
  }
};

export const jobUsers = null;
