import fetch from '../../lib/fetch/fetch';

export const Actions = {
  HTTP_GET_JOBS: 'HTTP_GET_JOBS',
  HTTP_RESP_JOBS: 'HTTP_RESP_JOBS',
};

export function httpGetJobs() {
  return {
    type: Actions.HTTP_GET_JOBS,
  };
}

export function httpRespJobs(json) {
  return {
    type: Actions.HTTP_RESP_JOBS,
    result: json,
  };
}

export function getJobs() {
  return (dispatch, getState) => {
    dispatch(httpGetJobs());

    return fetch(
      '/jobs',
      {
        method: 'GET',
        headers: getState().headers,
      }, dispatch)
      .then(response => response.json())
      .then(json => dispatch(httpRespJobs(json)));
  };
}
