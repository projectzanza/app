import { Types as ActionTypes } from './actionTypes';
import {
  createEntityEntries,
  deleteEntityEntries,
} from '../../lib/reducers/utils';
import Scope from './model';

export const initialState = {
  entities: {},
};

export default function scopeReducer(state = initialState, action) {
  let data = [];

  switch (action.type) {
    case ActionTypes.HTTP_RESP_SCOPES:
      data = [].concat(action.data);

      return createEntityEntries(
        state,
        data.map(scopeJson => new Scope(scopeJson)),
      );

    case ActionTypes.HTTP_RESP_DELETE_SCOPE:
      return deleteEntityEntries(
        state,
        action.scopeId,
      );

    default:
      return state;
  }
}
