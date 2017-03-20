import { Actions } from './actions';

const initialState = { authenticated: false };

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.HTTP_POST_AUTH:
    case Actions.HTTP_POST_SIGNIN:
      return Object.assign(
        {},
        state,
        action.user,
      );

    case Actions.HTTP_RESP_AUTH:
    case Actions.HTTP_RESP_SIGNIN:
      return Object.assign(
        {},
        state,
        action.result.data,
      );
    default:
      return state;
  }
}
