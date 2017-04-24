import fetch from '../../lib/fetch/fetch';

export const Actions = {
  HTTP_POST_AUTH: 'HTTP_POST_AUTH',
  HTTP_RESP_USER: 'HTTP_RESP_USER',
  HTTP_RESP_AUTH: 'HTTP_RESP_AUTH',
  HTTP_RESP_SIGNIN: 'HTTP_RESP_SIGNIN',
  HTTP_POST_SIGNIN: 'HTTP_POST_SIGNIN',
  HTTP_RESP_SIGNOUT: 'HTTP_RESP_SIGNOUT',
  HTTP_GET_USERS: 'HTTP_GET_USERS',
  HTTP_RESP_USERS: 'HTTP_RESP_USERS',
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
    type: Actions.HTTP_RESP_USER,
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

export function httpGetUsers(resultsId) {
  return {
    type: Actions.HTTP_GET_USERS,
    resultsId,
  };
}

export function httpRespUsers(json, resultsId) {
  return {
    type: Actions.HTTP_RESP_USERS,
    data: json.data,
    resultsId,
  };
}

export function httpRespInviteUsersToJob(json, jobId) {
  return {
    type: Actions.HTTP_RESP_USERS_INVITED_TO_JOB,
    data: json.data,
    jobId,
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

export function getMatchingUsersForJob(props) {
  return (dispatch, getState) => {
    dispatch(httpGetUsers(props.resultsId));

    return fetch(
      `/jobs/${props.jobId}/users/match`,
      {
        method: 'GET',
        headers: getState().headers,
      },
      dispatch)
      .then(response => response.json())
      .then(json => dispatch(httpRespUsers(json, props.resultsId)));
  };
}

export function getInvitedUsersForJob(props) {
  return (dispatch, getState) => {
    dispatch(httpGetUsers(props.resultsId));

    return fetch(
      '/users/invited',
      {
        method: 'GET',
        query: { job_id: props.jobId },
        headers: getState().headers,
      },
      dispatch)
      .then(response => response.json())
      .then(json => dispatch(httpRespUsers(json, props.resultsId)));
  };
}

export function inviteToJob(props) {
  return (dispatch, getState) => fetch(
      `/users/${props.userId}/invite`,
    {
      method: 'POST',
      body: JSON.stringify({ job_id: props.jobId }),
      headers: getState().headers,
    },
      dispatch)
      .then(response => response.json())
      .then((json) => {
        dispatch(httpRespUsers(json, props.resultsId));
      },
    );
}
