import { Types } from './join-actions';
import { updateJoinTableState } from './utils';

export const initialState = {
  entities: {},
};

export const jobEstimates = (state = initialState, action) => {
  switch (action.type) {
    case Types.JOB_ESTIMATES:
      return action.estimateIds.reduce((loopState, estimateId, index) =>
        updateJoinTableState(loopState, action.jobIds[index], [action.estimateIds[index]], 'merge'),
        state,
      );
    default:
      return state;
  }
};

export const userEstimates = (state = initialState, action) => {
  switch (action.type) {
    case Types.USER_ESTIMATES:
      return action.estimateIds.reduce((loopState, estimateId, index) =>
          updateJoinTableState(loopState, action.userIds[index], [action.estimateIds[index]], 'merge'),
        state,
      );
    default:
      return state;
  }
};
