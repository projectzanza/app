import fetch from '../../lib/fetch/fetch';
import * as actionTypes from './actionTypes';
import * as joinActions from '../../lib/reducers/join-actions';

export function submitEstimate(jobId, userId, estimate) {
  return (dispatch, getState) => {
    dispatch(actionTypes.httpPostEstimate(jobId, userId, estimate));

    const body = Object.assign(
      estimate,
      { job_id: jobId, user_id: userId },
    );
    let method = 'POST';
    let url = '/estimates';
    if (estimate.id) {
      method = 'PUT';
      url = `${url}/${estimate.id}`;
    }

    return fetch(
      url,
      {
        method,
        body: JSON.stringify(body),
        headers: getState().headers,
      }, dispatch)
      .then(response => response.json())
      .then((json) => {
        dispatch(actionTypes.httpRespEstimates(json));
        dispatch(joinActions.jobEstimates(json));
        dispatch(joinActions.userEstimates(json));
      },
    );
  };
}

export function anotherFunction() {}
