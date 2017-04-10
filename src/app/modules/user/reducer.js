import { Actions } from './actions';
import { overrideNull } from '../../lib/reducers/utils';

export const userInitialState = {
  name: '',
  bio: '',
  tag_list: '',
  per_diem: { min: 0, max: 1000 },
};

export const reducerInitialState = {
  items: {},
  currentUser: undefined,
};

export default function userReducer(state = reducerInitialState, action) {
  let nextState;
  let user;

  switch (action.type) {
    case Actions.HTTP_POST_AUTH:
    case Actions.HTTP_POST_SIGNIN:
      return state;

    case Actions.HTTP_RESP_AUTH:
      user = Object.assign(
        { authenticated: false },
        userInitialState,
        overrideNull(userInitialState, action.data),
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

    case Actions.HTTP_RESP_SIGNIN:
      user = Object.assign(
        { authenticated: true },
        userInitialState,
        overrideNull(userInitialState, action.data),
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

    case Actions.HTTP_RESP_USER:
      user = Object.assign(
        {},
        state.items[action.data.id],
        overrideNull(userInitialState, action.data),
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
        },
      );

    default:
      return state;
  }
}
