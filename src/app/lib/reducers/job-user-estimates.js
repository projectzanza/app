import { Types } from './join-actions';
import { updateJoinTableState } from './utils';

export const initialState = {
  entities: {},
};

export const jobEstimates = (state = initialState, action) => {
  const data = [].concat(action.data);
  switch (action.type) {
    case Types.JOB_ESTIMATES:
      return data.reduce((loopState, estimate) =>
        updateJoinTableState(loopState, estimate.job_id, estimate.id, 'merge'),
        state,
      );

    case Types.JOB_ESTIMATES_DELETE:
      return data.reduce((loopState, estimate) =>
        updateJoinTableState(loopState, estimate.job_id, estimate.id, 'purge'),
        state,
      );

    default:
      return state;
  }
};

export const userEstimates = (state = initialState, action) => {
  const data = [].concat(action.data);
  switch (action.type) {
    case Types.USER_ESTIMATES:
      return data.reduce((loopState, estimate) =>
        updateJoinTableState(loopState, estimate.user_id, estimate.id, 'merge'),
        state,
      );
    case Types.USER_ESTIMATES_DELETE:
      return data.reduce((loopState, estimate) =>
        updateJoinTableState(loopState, estimate.user_id, estimate.id, 'purge'),
        state,
      );
    default:
      return state;
  }
};
