import { Actions } from './actions';

function headers(state = {}, action) {
  let authTokens = {};
  switch (action.type) {
    case Actions.HTTP_HEADER_RESP:
      if (action.headers.uid) {
        authTokens = {
          access_token: action.headers.access_token,
          uid: action.headers.uid,
        };
      }


      return Object.assign(
        {},
        state,
        authTokens,
      );
    default:
      return state;
  }
}

export default headers;
