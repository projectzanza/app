import { Types as ActionTypes } from './actionTypes';
import { createEntityEntries } from '../../lib/reducers/utils';
import Job from './model';

export const initialState = {
  entities: {},
};

export default function jobReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.HTTP_RESP_JOB:
      return createEntityEntries(state, [new Job(action.data)]);

    case ActionTypes.HTTP_RESP_JOBS:
      return createEntityEntries(
        state,
        action.data.map(jobJson => new Job(jobJson)),
      );

    default:
      return state;
  }
}
