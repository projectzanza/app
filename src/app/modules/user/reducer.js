import { Actions } from './actions';

export const initialState = {
  items: {},
  currentUser: undefined,
};

export default function userReducer(state = initialState, action) {
  let nextState;
  let user;

  switch (action.type) {
    case Actions.HTTP_POST_AUTH:
    case Actions.HTTP_POST_SIGNIN:
      return state;

    case Actions.HTTP_RESP_AUTH:
      user = Object.assign(
        { authenticated: false },
        action.data,
      );

      nextState = Object.assign(
        {},
        state.items,
        { [action.data.id]: user },
      );

      return Object.assign(
        {},
        state,
        {
          items: nextState,
          currentUser: action.data.id
        },
      );

    case Actions.HTTP_RESP_SIGNIN:
      user = Object.assign(
        { authenticated: true },
        action.data,
      );

      nextState = Object.assign(
        {},
        state.items,
        { [action.data.id]: user },
      );

      return Object.assign(
        {},
        state,
        {
          items: nextState,
          currentUser: action.data.id,
        },
      );

    case Actions.HTTP_RESP_SIGNOUT:
      user = Object.assign(
        {},
        state.items[state.currentUser],
        { authenticated: false },
      );

      nextState = Object.assign(
        {},
        state.items,
        { [state.currentUser]: user },
      );

      return Object.assign(
        {},
        state,
        {
          items: nextState,
          currentUser: undefined,
        },
      );

    default:
      return state;
  }
}
