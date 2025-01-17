import { Types } from './join-actions';
import { updateJoinTableState } from './utils';

export const initialState = {
  entities: {},
};

export const jobScopes = (state = initialState, action) => {
  switch (action.type) {
    case Types.JOB_SCOPES:
      return updateJoinTableState(state, action.jobId, action.scopeIds, 'merge');

    case Types.JOB_SCOPES_DELETE:
      return updateJoinTableState(state, action.jobId, action.scopeId, 'purge');

    default:
      return state;
  }
};
