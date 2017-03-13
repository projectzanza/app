import { HTTP_POST_AUTH, HTTP_RESP_AUTH } from './actions';

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case HTTP_POST_AUTH:
      return Object.assign(
        {},
        state,
        action.user,
      );

    case HTTP_RESP_AUTH:
      return Object.assign(
        {},
        state,
        action.result.data,
      );
    default:
      return state;
  }
}
