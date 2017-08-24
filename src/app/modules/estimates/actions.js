import fetch from '../../lib/fetch/fetch';
import * as actionTypes from './actionTypes';
import * as joinActions from '../../lib/reducers/join-actions';

export function submitEstimate(jobId, estimate) {
  return (dispatch, getState) => {
    dispatch(actionTypes.httpPostEstimate(jobId, estimate));

    const body = Object.assign(
      estimate,
      { job_id: jobId },
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

export function deleteEstimate(estimate) {
  return (dispatch, getState) => {
    dispatch(actionTypes.httpDeleteEstimate(estimate));

    return fetch(
      `/estimates/${estimate.id}`,
      {
        method: 'DELETE',
        headers: getState().headers,
      }, dispatch)
      .then(() => {
        dispatch(actionTypes.httpRespDeleteEstimate(estimate));
        dispatch(joinActions.jobEstimateDelete(estimate));
        dispatch(joinActions.userEstimateDelete(estimate));
      });
  };
}
