import { Actions } from './actions';

const initialState = { authenticated: false };

export default function userReducer(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case Actions.HTTP_POST_AUTH:
    case Actions.HTTP_POST_SIGNIN:
      nextState = Object.assign(
        {},
        state,
        action.user,
      );
      delete nextState.password;
      return nextState;

    case Actions.HTTP_RESP_AUTH:
    case Actions.HTTP_RESP_SIGNIN:
      return Object.assign(
        {},
        state,
        action.result.data,
      );
    case Actions.HTTP_RESP_SIGNOUT:
      return Object.assign(
        {},
        action.result.data,
      );
    default:
      return state;
  }
}
