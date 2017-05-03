import { Types as ActionTypes } from './actionTypes';
import { createEntityEntries } from '../../lib/reducers/utils';
import Scope from './model';

export const initialState = {
  entities: {},
};

export default function scopeReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.HTTP_RESP_SCOPES:
      return createEntityEntries(
        state,
        action.data.map(scopeJson => new Scope(scopeJson)),
      );

    default:
      return state;
  }
}
