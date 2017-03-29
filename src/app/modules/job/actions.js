import fetch from '../../lib/fetch/fetch';

export const Actions = {
  HTTP_POST_JOB: 'HTTP_POST_JOB',
  HTTP_RESP_JOB: 'HTTP_RESP_JOB',
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
    result: json.data,
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
      .then(json => dispatch(httpRespJob(json)));
  };
}
