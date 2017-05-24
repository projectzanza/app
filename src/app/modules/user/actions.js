import _ from 'lodash';
import fetch from '../../lib/fetch/fetch';
import * as ActionTypes from './actionTypes';
import * as joinActions from '../../lib/reducers/join-actions';
import * as estimateActionTypes from '../estimates/actionTypes';

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
      .then((json) => {
        const estimatesJson = { data: [_.get(json, 'data.meta.job.estimate')] };

        dispatch(ActionTypes.httpRespUser(json));
        dispatch(estimateActionTypes.httpRespEstimates(estimatesJson));
        dispatch(joinActions.jobEstimates(estimatesJson));
        dispatch(joinActions.userEstimates(estimatesJson));
      });
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
        dispatch(joinActions.jobMatchingUsers(props.jobId, json, 'reset'));
      });
  };
}

export function getCollaboratingUsersForJob(props) {
  return (dispatch, getState) => {
    dispatch(ActionTypes.httpGetUsers());

    return fetch(
      `/jobs/${props.jobId}/users/collaborating`,
      {
        method: 'GET',
        headers: getState().headers,
      },
      dispatch)
      .then(response => response.json())
      .then((json) => {
        const estimatesJson = { data: json.data.map(job => _.get(job, 'meta.job.estimate')) };

        dispatch(ActionTypes.httpRespUsers(json));
        dispatch(joinActions.jobCollaboratingUsers(props.jobId, json, 'reset'));
        dispatch(estimateActionTypes.httpRespEstimates(estimatesJson));
        dispatch(joinActions.jobEstimates(estimatesJson));
        dispatch(joinActions.userEstimates(estimatesJson));
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
        dispatch(joinActions.jobCollaboratingUsers(props.jobId, json, 'merge'));
      });
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
        dispatch(joinActions.jobCollaboratingUsers(props.jobId, json, 'merge'));
      });
  };
}

export function postRejectUser(props) {
  return (dispatch, getState) => fetch(
      `/users/${props.userId}/reject`,
    {
      method: 'POST',
      body: JSON.stringify({ job_id: props.jobId }),
      headers: getState().headers,
    },
      dispatch)
      .then(response => response.json())
      .then((json) => {
        dispatch(ActionTypes.httpRespUser(json));
      });
}
