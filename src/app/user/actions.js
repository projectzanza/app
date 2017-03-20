import fetch from '../lib/fetch/fetch';

const Actions = {
  HTTP_POST_AUTH: 'HTTP_POST_AUTH',
  HTTP_RESP_AUTH: 'HTTP_RESP_AUTH',
  HTTP_POST_SIGNIN: 'HTTP_POST_SIGNIN',
  HTTP_RESP_SIGNIN: 'HTTP_RESP_SIGNIN',
};

function httpPostAuth(user) {
  return {
    type: Actions.HTTP_POST_AUTH,
    user,
  };
}

function httpRespAuth(json) {
  return {
    type: Actions.HTTP_RESP_AUTH,
    result: json,
    receivedAt: Date.now(),
  };
}

function createUser(user) {
  return (dispatch, getState) => {
    dispatch(httpPostAuth(user));

    return fetch(
      '/auth',
      {
        method: 'POST',
        body: JSON.stringify(user),
        headers: getState().headers,
      }, dispatch)
      .then(response => response.json())
      .then(json => dispatch(httpRespAuth(json)),
      );
  };
}

function httpPostSignIn(user) {
  return {
    type: Actions.HTTP_POST_SIGNIN,
    user,
  };
}

function httpRespSignIn(json) {
  Object.assign(json.data, { authenticated: true });
  return {
    type: Actions.HTTP_RESP_SIGNIN,
    result: json,
    receivedAt: Date.now(),
  };
}

function loginUser(user) {
  return (dispatch, getState) => {
    dispatch(httpPostSignIn(user));

    return fetch('/auth/sign_in',
      {
        method: 'POST',
        body: JSON.stringify(user),
        headers: getState().headers,
      },
      dispatch)
      .then(response => response.json())
      .then(json => dispatch(httpRespSignIn(json)),
      );
  };
}

export { Actions, createUser, loginUser };
