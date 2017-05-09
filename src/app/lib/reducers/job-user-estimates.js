import { Types } from './join-actions';
import { updateJoinTableState } from './utils';

export const initialState = {
  entities: {},
};

export const jobEstimates = (state = initialState, action) => {
  switch (action.type) {
    case Types.JOB_ESTIMATES:
      return updateJoinTableState(state, action.jobId, action.estimateIds);
    default:
      return state;
  }
};

export const userEstimates = (state = initialState, action) => {
  switch (action.type) {
    case Types.USER_ESTIMATES:
      return updateJoinTableState(state, action.userId, action.estimateIds);
    default:
      return state;
  }
};
