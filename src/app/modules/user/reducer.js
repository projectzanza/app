import { Types as ActionTypes } from './actionTypes';
import { createEntityEntries } from '../../lib/reducers/utils';

export const initialState = {
  entities: {},
  currentUser: undefined,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.HTTP_POST_AUTH:
    case ActionTypes.HTTP_POST_SIGNIN:
      return state;

    case ActionTypes.HTTP_RESP_AUTH:
      return Object.assign(
        state,
        { currentUser: undefined },
      );

    case ActionTypes.HTTP_RESP_SIGNIN:
      return Object.assign(
        state,
        { currentUser: action.data.id },
      );

    case ActionTypes.HTTP_RESP_SIGNOUT:
      return Object.assign(
        state,
        { currentUser: undefined },
      );

    case ActionTypes.HTTP_RESP_USER:
      return createEntityEntries(state, [action.data]);

    case ActionTypes.HTTP_RESP_USERS:
      return createEntityEntries(state, action.data);

    default:
      return state;
  }
}
