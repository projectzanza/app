import { Types as ActionTypes } from './actionTypes';
import { createEntityEntries } from '../../lib/reducers/utils';

export const initialState = {
  entities: {},
};

export default function jobReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.HTTP_RESP_JOB:
      return createEntityEntries(state, [action.data]);

    case ActionTypes.HTTP_RESP_JOBS:
      return createEntityEntries(state, action.data);

    default:
      return state;
  }
}
