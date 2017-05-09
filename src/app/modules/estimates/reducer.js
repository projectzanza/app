import { Types as ActionTypes } from './actionTypes';
import { createEntityEntries } from '../../lib/reducers/utils';
import Estimate from './model';

export const initialState = {
  entities: {},
};

export default function estimateReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.HTTP_RESP_ESTIMATE:
      return createEntityEntries(state, [new Estimate(action.data)]);

    default:
      return state;
  }
}
