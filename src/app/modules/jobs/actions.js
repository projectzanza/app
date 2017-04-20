import fetch from '../../lib/fetch/fetch';

export const Actions = {
  HTTP_POST_JOB: 'HTTP_POST_JOB',
  HTTP_RESP_JOB: 'HTTP_RESP_JOB',
  HTTP_GET_JOB: 'HTTP_GET_JOB',
  HTTP_PUT_JOB: 'HTTP_PUT_JOB',
  HTTP_GET_JOBS: 'HTTP_GET_JOBS',
  HTTP_RESP_JOBS: 'HTTP_RESP_JOBS',
};

export function httpPostJob(job) {
  return {
    type: Actions.HTTP_POST_JOB,
    job,
  };
}

export function httpRespJob(json) {
  return {
    type: Actions.HTTP_RESP_JOB,
    data: json.data,
  };
}

export function httpGetJob(id) {
  return {
    type: Actions.HTTP_GET_JOB,
    id,
  };
}

export function httpPutJob(job) {
  return {
    type: Actions.HTTP_PUT_JOB,
    job,
  };
}

export function httpGetJobs(resultsId) {
  return {
    type: Actions.HTTP_GET_JOBS,
    resultsId,
  };
}

export function httpRespJobs(json, resultsId) {
  return {
    type: Actions.HTTP_RESP_JOBS,
    data: json.data,
    resultsId,
  };
}

export function createJob(job) {
  return (dispatch, getState) => {
    dispatch(httpPostJob(job));

    return fetch(
      '/jobs',
      {
        method: 'POST',
        body: JSON.stringify(job),
        headers: getState().headers,
      }, dispatch)
      .then(response => response.json())
      .then((json) => {
        dispatch(httpRespJob(json));
        return json.data.id;
      });
  };
}

export function getJob(id) {
  return (dispatch, getState) => {
    dispatch(httpGetJob(id));

    return fetch(
      `/jobs/${id}`,
      {
        method: 'GET',
        headers: getState().headers,
      }, dispatch)
      .then(response => response.json())
      .then(json => dispatch(httpRespJob(json)));
  };
}

export function putJob(job) {
  return (dispatch, getState) => {
    dispatch(httpPutJob(job));

    return fetch(
      `/jobs/${job.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(job),
        headers: getState().headers,
      }, dispatch)
      .then(response => response.json())
      .then(json => dispatch(httpRespJob(json)));
  };
}

export function getJobs(props) {
  return (dispatch, getState) => {
    dispatch(httpGetJobs(props.resultsId));
    const path = props.userId ? `/users/${props.userId}/jobs` : '/jobs';

    return fetch(
      path,
      {
        method: 'GET',
        headers: getState().headers,
      }, dispatch)
      .then(response => response.json())
      .then(json => dispatch(httpRespJobs(json, props.resultsId)));
  };
}

export function getMatchingJobsForUser(props) {
  return (dispatch, getState) => {
    dispatch(httpGetJobs(props.resultsId));

    return fetch(
      `/users/${props.userId}/jobs/match`,
      {
        method: 'GET',
        headers: getState().headers,
      }, dispatch)
      .then(response => response.json())
      .then(json => dispatch(httpRespJobs(json, props.resultsId)));
  };
}
