import fetch from '../../lib/fetch/fetch';

export const Actions = {
  HTTP_POST_AUTH: 'HTTP_POST_AUTH',
  HTTP_RESP_USER: 'HTTP_RESP_USER',
  HTTP_RESP_AUTH: 'HTTP_RESP_AUTH',
  HTTP_RESP_SIGNIN: 'HTTP_RESP_SIGNIN',
  HTTP_POST_SIGNIN: 'HTTP_POST_SIGNIN',
  HTTP_RESP_SIGNOUT: 'HTTP_RESP_SIGNOUT',
};

export function httpPostAuth(user) {
  return {
    type: Actions.HTTP_POST_AUTH,
    user,
  };
}

export function httpRespSignIn(json) {
  return {
    type: Actions.HTTP_RESP_SIGNIN,
    data: json.data,
  };
}

export function httpRespAuth(json) {
  return {
    type: Actions.HTTP_RESP_AUTH,
    data: json.data,
  };
}

export function httpRespUser(json) {
  return {
    type: Actions.HTTP_RESP_AUTH,
    data: json.data,
  };
}

export function httpPostSignIn(user) {
  return {
    type: Actions.HTTP_POST_SIGNIN,
    user,
  };
}

export function httpRespSignOut() {
  return {
    type: Actions.HTTP_RESP_SIGNOUT,
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
      .then(json => dispatch(httpRespAuth(json)));
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


export function getUser(userId) {
  return (dispatch, getState) =>
    fetch(
      `/users/${userId}`,
      {
        method: 'GET',
        headers: getState().headers,
      },
      dispatch)
      .then(response => response.json())
      .then(json => dispatch(httpRespUser(json)));
}

export function putUser(user) {
  return (dispatch, getState) =>
    fetch(
      `/users/${user.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: getState().headers,
      },
      dispatch)
      .then(response => response.json())
      .then(json => dispatch(httpRespUser(json)));
}
