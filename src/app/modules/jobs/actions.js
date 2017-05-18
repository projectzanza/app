import _ from 'lodash';
import fetch from '../../lib/fetch/fetch';
import * as joinActions from '../../lib/reducers/join-actions';
import * as ActionTypes from './actionTypes';
import * as estimateActionTypes from '../estimates/actionTypes';

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
      .then(json => dispatch(ActionTypes.httpRespJob(json)));
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
        const estimatesJson = { data: json.data.map(job => _.get(job, 'meta.current_user.estimate')) };

        dispatch(ActionTypes.httpRespJobs(json));
        dispatch(joinActions.userCollaboratingJobs(props.userId, json, 'reset'));
        dispatch(estimateActionTypes.httpRespEstimates(estimatesJson));
        dispatch(joinActions.jobEstimates(estimatesJson));
        dispatch(joinActions.userEstimates(estimatesJson));
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
