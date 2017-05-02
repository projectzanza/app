import fetch from '../../lib/fetch/fetch';
import * as ActionTypes from './actionTypes';
import * as joinActionTypes from '../../lib/reducers/join-actions';

export function createUser(user) {
  return (dispatch, getState) => {
    dispatch(ActionTypes.httpPostAuth(user));

    return fetch(
      '/auth',
      {
        method: 'POST',
        body: JSON.stringify(user),
        headers: getState().headers,
      }, dispatch)
      .then(response => response.json())
      .then(json => dispatch(ActionTypes.httpRespUser(json)));
  };
}

export function loginUser(user) {
  return (dispatch, getState) => {
    dispatch(ActionTypes.httpPostSignIn(user));

    return fetch('/auth/sign_in',
      {
        method: 'POST',
        body: JSON.stringify(user),
        headers: getState().headers,
      },
      dispatch)
      .then(response => response.json())
      .then((json) => {
        dispatch(ActionTypes.httpRespUser(json));
        dispatch(ActionTypes.httpRespSignIn(json));
      },
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
      .then(json => dispatch(ActionTypes.httpRespSignOut(json)));
}


export function getUser(userId, jobId) {
  let url = `/users/${userId}`;
  if (jobId) {
    url = `/jobs/${jobId}${url}`;
  }

  return (dispatch, getState) =>
    fetch(
      url,
      {
        method: 'GET',
        headers: getState().headers,
      },
      dispatch)
      .then(response => response.json())
      .then(json => dispatch(ActionTypes.httpRespUser(json)));
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
      .then(json => dispatch(ActionTypes.httpRespUser(json)));
}

export function getMatchingUsersForJob(props) {
  return (dispatch, getState) => {
    dispatch(ActionTypes.httpGetUsers());

    return fetch(
      `/jobs/${props.jobId}/users/match`,
      {
        method: 'GET',
        headers: getState().headers,
      },
      dispatch)
      .then(response => response.json())
      .then((json) => {
        dispatch(ActionTypes.httpRespUsers(json));
        dispatch(joinActionTypes.jobMatchingUsers(props.jobId, json));
      });
  };
}

export function getInvitedUsersForJob(props) {
  return (dispatch, getState) => {
    dispatch(ActionTypes.httpGetUsers());

    return fetch(
      '/users/invited',
      {
        method: 'GET',
        query: { job_id: props.jobId },
        headers: getState().headers,
      },
      dispatch)
      .then(response => response.json())
      .then((json) => {
        dispatch(ActionTypes.httpRespUsers(json));
        dispatch(joinActionTypes.jobInvitedUsers(props.jobId, json));
      });
  };
}

export function postInviteToJob(props) {
  return (dispatch, getState) => {
    dispatch(ActionTypes.httpGetUsers());

    return fetch(
      `/users/${props.userId}/invite`,
      {
        method: 'POST',
        body: JSON.stringify({ job_id: props.jobId }),
        headers: getState().headers,
      },
      dispatch)
      .then(response => response.json())
      .then((json) => {
        dispatch(ActionTypes.httpRespUsers(json));
        dispatch(joinActionTypes.jobInvitedUsers(props.jobId, json));
      },
      );
  };
}

export function postAwardJob(props) {
  return (dispatch, getState) => {
    dispatch(ActionTypes.httpGetUsers());

    return fetch(
      `/users/${props.userId}/award`,
      {
        method: 'POST',
        body: JSON.stringify({ job_id: props.jobId }),
        headers: getState().headers,
      },
      dispatch)
      .then(response => response.json())
      .then((json) => {
        dispatch(ActionTypes.httpRespUser(json));
        dispatch(joinActionTypes.jobAwardUser(props.jobId, json));
      },
      );
  };
}

export function getInterestedUsersForJob(props) {
  return (dispatch, getState) => {
    dispatch(ActionTypes.httpGetUsers());

    fetch(
      `/jobs/${props.jobId}/users/interested`,
      {
        method: 'GET',
        headers: getState().headers,
      }, dispatch)
      .then(response => response.json())
      .then((json) => {
        dispatch(ActionTypes.httpRespUsers(json));
        dispatch(joinActionTypes.jobInterestedUsers(props.jobId, json));
      },
    );
  };
}

export function getAwardedUsersForJob(props) {
  return (dispatch, getState) => {
    dispatch(ActionTypes.httpGetUsers());

    fetch(
      `/jobs/${props.jobId}/users/awarded`,
      {
        method: 'GET',
        headers: getState().headers,
      }, dispatch)
      .then(response => response.json())
      .then((json) => {
        dispatch(ActionTypes.httpRespUser(json));
        dispatch(joinActionTypes.jobAwardUser(props.jobId, json));
      },
      );
  };
}
