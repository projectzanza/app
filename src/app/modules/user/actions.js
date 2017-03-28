import fetch from '../../lib/fetch/fetch';

export const Actions = {
  HTTP_POST_AUTH: 'HTTP_POST_AUTH',
  HTTP_RESP_AUTH: 'HTTP_RESP_AUTH',
  HTTP_POST_SIGNIN: 'HTTP_POST_SIGNIN',
  HTTP_RESP_SIGNIN: 'HTTP_RESP_SIGNIN',
  HTTP_RESP_SIGNOUT: 'HTTP_RESP_SIGNOUT',
};

export function httpPostAuth(user) {
  return {
    type: Actions.HTTP_POST_AUTH,
    user,
  };
}

export function httpRespAuth(json) {
  return {
    type: Actions.HTTP_RESP_AUTH,
    result: json.data,
  };
}

export function createUser(user) {
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

export function httpPostSignIn(user) {
  return {
    type: Actions.HTTP_POST_SIGNIN,
    user,
  };
}

export function httpRespSignIn(json) {
  return {
    type: Actions.HTTP_RESP_SIGNIN,
    result: json.data,
  };
}

export function loginUser(user) {
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


export function httpRespSignOut() {
  return {
    type: Actions.HTTP_RESP_SIGNOUT,
  };
}

export function logoutUser() {
  return (dispatch, getState) =>
    fetch(
      '/auth/sign_out',
      {
        method: 'DELETE',
        headers: getState().headers,
      },
      dispatch)
      .then(response => response.json())
      .then(json => dispatch(httpRespSignOut(json)));
}
