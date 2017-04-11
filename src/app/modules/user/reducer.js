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
  resultIds: [],
};

export default function userReducer(state = reducerInitialState, action) {
  let nextState;
  let user;
  let users;

  switch (action.type) {
    case Actions.HTTP_POST_AUTH:
    case Actions.HTTP_POST_SIGNIN:
      return state;

    case Actions.HTTP_RESP_AUTH:
      user = Object.assign(
        {},
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
          currentUser: undefined,
        },
      );

    case Actions.HTTP_RESP_SIGNIN:
      user = Object.assign(
        {},
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
        { items: nextState },
      );

    case Actions.HTTP_RESP_USERS:
      users = action.data.reduce((userList, userJson) => {
        Object.assign(
          userList,
          { [userJson.id]: overrideNull(userInitialState, userJson) },
        );
        return userList;
      }, {});

      nextState = Object.assign(
        {},
        state.items,
        users,
      );

      return Object.assign(
        {},
        state,
        {
          items: nextState,
          resultIds: Object.keys(users),
        },
      );

    default:
      return state;
  }
}
