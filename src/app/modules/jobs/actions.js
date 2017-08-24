import _ from 'lodash';
import fetch from '../../lib/fetch/fetch';
import * as joinActions from '../../lib/reducers/join-actions';
import * as ActionTypes from './actionTypes';
import * as estimateActionTypes from '../estimates/actionTypes';

function dispatchEstimateActions(dispatch, json) {
  let estimates;
  if (json.data instanceof Array) {
    estimates = json.data.map(job => _.get(job, 'meta.current_user.estimates'));
    estimates = _.compact(_.flatten(estimates));
  } else {
    estimates = _.get(json.data, 'meta.current_user.estimates');
  }
  const estimatesJson = { data: estimates };

  if (estimatesJson.data) {
    dispatch(estimateActionTypes.httpRespEstimates(estimatesJson));
    dispatch(joinActions.jobEstimates(estimatesJson));
    dispatch(joinActions.userEstimates(estimatesJson));
  }
}

export function createJob(job) {
  return (dispatch, getState) => {
    dispatch(ActionTypes.httpPostJob(job));

    return fetch(
      '/jobs',
      {
        method: 'POST',
        body: JSON.stringify(job),
        headers: getState().headers,
      }, dispatch)
      .then(response => response.json())
      .then((json) => {
        dispatch(ActionTypes.httpRespJob(json));
        return json.data.id;
      });
  };
}

export function getJob(jobId, userId) {
  return (dispatch, getState) => {
    dispatch(ActionTypes.httpGetJob(jobId));
    let url = `/jobs/${jobId}`;
    if (userId) {
      url = `/users/${userId}${url}`;
    }

    return fetch(
      url,
      {
        method: 'GET',
        headers: getState().headers,
      }, dispatch)
      .then(response => response.json())
      .then((json) => {
        dispatch(ActionTypes.httpRespJob(json));
        dispatchEstimateActions(dispatch, json);
      });
  };
}

export function putJob(job) {
  return (dispatch, getState) => {
    dispatch(ActionTypes.httpPutJob(job));

    return fetch(
      `/jobs/${job.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(job),
        headers: getState().headers,
      }, dispatch)
      .then(response => response.json())
      .then(json => dispatch(ActionTypes.httpRespJob(json)));
  };
}

export function getUserJobs(props) {
  return (dispatch, getState) => {
    dispatch(ActionTypes.httpGetJobs());

    return fetch(
      `/users/${props.userId}/jobs`,
      {
        method: 'GET',
        headers: getState().headers,
      }, dispatch)
      .then(response => response.json())
      .then((json) => {
        dispatch(ActionTypes.httpRespJobs(json));
        dispatch(joinActions.userJobs(props.userId, json));
      });
  };
}

export function getCollaboratingJobs(props) {
  return (dispatch, getState) => {
    dispatch(ActionTypes.httpGetJobs());

    return fetch(
      '/jobs/collaborating',
      {
        method: 'GET',
        headers: getState().headers,
      }, dispatch)
      .then(response => response.json())
      .then((json) => {
        dispatch(ActionTypes.httpRespJobs(json));
        dispatch(joinActions.userCollaboratingJobs(props.userId, json, 'reset'));
        dispatchEstimateActions(dispatch, json);
      });
  };
}

export function getMatchingJobsForUser(props) {
  return (dispatch, getState) => {
    dispatch(ActionTypes.httpGetJobs());

    return fetch(
      `/users/${props.userId}/jobs/match`,
      {
        method: 'GET',
        headers: getState().headers,
      }, dispatch)
      .then(response => response.json())
      .then((json) => {
        dispatch(ActionTypes.httpRespJobs(json));
        dispatch(joinActions.userMatchingJobs(props.userId, json, 'reset'));
      });
  };
}

export function postRegisterInterestInJob(props) {
  return (dispatch, getState) => {
    dispatch(ActionTypes.httpGetJobs());

    return fetch(
      `/jobs/${props.jobId}/register_interest`,
      {
        method: 'POST',
        headers: getState().headers,
      }, dispatch)
      .then(response => response.json())
      .then((json) => {
        dispatch(ActionTypes.httpRespJobs(json));
        dispatch(joinActions.userCollaboratingJobs(props.userId, json, 'merge'));
      });
  };
}

export function postAcceptJob(props) {
  return (dispatch, getState) => {
    dispatch(ActionTypes.httpGetJobs());

    return fetch(
      `/jobs/${props.jobId}/accept`,
      {
        method: 'POST',
        headers: getState().headers,
      }, dispatch)
      .then(response => response.json())
      .then((json) => {
        dispatch(ActionTypes.httpRespJobs(json));
        dispatch(joinActions.userCollaboratingJobs(props.userId, json, 'merge'));
      });
  };
}

export function postVerifyJob(props) {
  return (dispatch, getState) => {
    dispatch(ActionTypes.httpGetJob());

    return fetch(
      `/jobs/${props.jobId}/verify`,
      {
        method: 'POST',
        body: JSON.stringify({ scopes: true }),
        headers: getState().headers,
      }, dispatch)
      .then(response => response.json())
      .then((json) => {
        dispatch(ActionTypes.httpRespJob(json));
      });
  };
}

