import _ from 'lodash';
import { Types as ActionTypes } from './actionTypes';
import {
  createEntityEntries,
  deleteEntityEntries,
} from '../../lib/reducers/utils';
import Estimate from './model';

export const initialState = {
  entities: {},
};

export default function estimateReducer(state = initialState, action) {
  let estimates;
  switch (action.type) {
    case ActionTypes.HTTP_RESP_ESTIMATES:
      estimates = _.compact(action.data);
      if (estimates.length > 0) {
        return createEntityEntries(
          state,
          estimates.map(json => new Estimate(json)),
        );
      }
      return state;

    case ActionTypes.HTTP_DELETE_ESTIMATE:
      return deleteEntityEntries(
        state,
        action.data.id,
      );
    default:
      return state;
  }
}
