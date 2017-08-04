import fetch from '../../lib/fetch/fetch';
import * as ActionTypes from './actionTypes';

export function postToken(token, jobId) {
  return (dispatch, getState) => {
    dispatch(ActionTypes.httpPostPaymentsToken(token, jobId));
    return fetch(
      `/jobs/${jobId}/payments/token`,
      {
        method: 'POST',
        body: JSON.stringify({ token }),
        headers: getState().headers,
      }, dispatch)
      .then(response => response.json());
  };
}

export function postCompletePayment(jobId) {
  return (dispatch, getState) => fetch(
      `/jobs/${jobId}/payments/complete`,
    {
      method: 'POST',
      headers: getState().headers,
    }, dispatch)
    .then(response => response.json());
}
