import fetch from '../../lib/fetch/fetch';
import * as joinActions from '../../lib/reducers/join-actions';
import * as ActionTypes from './actionTypes';

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

export function getJob(id) {
  return (dispatch, getState) => {
    dispatch(ActionTypes.httpGetJob(id));

    return fetch(
      `/jobs/${id}`,
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
        dispatch(joinActions.userMatchingJobs(props.userId, json));
      });
  };
}

export function getInvitedJobsForUser(props) {
  return (dispatch, getState) => {
    dispatch(ActionTypes.httpGetJobs());

    return fetch(
      `/users/${props.userId}/jobs/invited`,
      {
        method: 'GET',
        headers: getState().headers,
      }, dispatch)
      .then(response => response.json())
      .then((json) => {
        dispatch(ActionTypes.httpRespJobs(json));
        dispatch(joinActions.userInvitedJobs(props.userId, json));
      });
  };
}
