import _ from 'lodash';
import URL from 'url';
import fetch from '../../lib/fetch/fetch';
import * as ActionTypes from './actionTypes';
import * as joinActions from '../../lib/reducers/join-actions';
import * as estimateActionTypes from '../estimates/actionTypes';
import AlertController from '../alerts/controller';

function dispatchEstimateActions(dispatch, json) {
  let estimates;
  if (json.data instanceof Array) {
    estimates = json.data.map(job => _.get(job, 'meta.job.estimates'));
    estimates = _.compact(_.flatten(estimates));
  } else {
    estimates = _.get(json, 'data.meta.job.estimates');
  }
  const estimatesJson = { data: estimates };

  if (estimatesJson.data) {
    dispatch(estimateActionTypes.httpRespEstimates(estimatesJson));
    dispatch(joinActions.jobEstimates(estimatesJson));
    dispatch(joinActions.userEstimates(estimatesJson));
  }
}

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

      .then((json) => {
        dispatch(ActionTypes.httpRespUser(json));
        dispatchEstimateActions(dispatch, json);
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

      .then(json => dispatch(ActionTypes.httpRespUser(json)))
      .then(() => AlertController.dispatchAlert(dispatch, 'success', 'Profile updated'));
}

export function getMatchingUsersForJob(jobId, filter) {
  return (dispatch, getState) => {
    dispatch(ActionTypes.httpGetUsers());

    const urlParams = { pathname: `/jobs/${jobId}/users/match` };
    if (filter) {
      Object.assign(urlParams, { query: { filter } });
    }
    const url = URL.format(urlParams);

    return fetch(
      url,
      {
        method: 'GET',
        headers: getState().headers,
      },
      dispatch)

      .then((json) => {
        dispatch(ActionTypes.httpRespUsers(json));
        dispatch(joinActions.jobMatchingUsers(jobId, json, 'reset'));
      });
  };
}

export function getCollaboratingUsersForJob(jobId, filter) {
  return (dispatch, getState) => {
    dispatch(ActionTypes.httpGetUsers());

    const urlParams = { pathname: `/jobs/${jobId}/users/collaborating` };
    if (filter) {
      Object.assign(urlParams, { query: { filter } });
    }
    const url = URL.format(urlParams);

    return fetch(
      url,
      {
        method: 'GET',
        headers: getState().headers,
      },
      dispatch)

      .then((json) => {
        dispatch(ActionTypes.httpRespUsers(json));
        dispatch(joinActions.jobCollaboratingUsers(jobId, json, 'reset'));
        dispatchEstimateActions(dispatch, json);
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

      .then((json) => {
        dispatch(ActionTypes.httpRespUser(json));
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

      .then((json) => {
        dispatch(ActionTypes.httpRespUser(json));
      });
}
