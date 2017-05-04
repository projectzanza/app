import fetch from '../../lib/fetch/fetch';
import * as ActionTypes from './actionTypes';
import * as joinActions from '../../lib/reducers/join-actions';

export function createScope(jobId, scope) {
  return (dispatch, getState) => {
    dispatch(ActionTypes.httpPostScope(jobId, scope));

    return fetch(
      `/jobs/${jobId}/scopes`,
      {
        method: 'POST',
        body: JSON.stringify(scope),
        headers: getState().headers,
      }, dispatch)
      .then(response => response.json())
      .then((json) => {
        dispatch(ActionTypes.httpRespScopes(json));
        dispatch(joinActions.jobScopes(jobId, json));
        return json.data;
      });
  };
}

export function getScopes(jobId) {
  return (dispatch, getState) => {
    dispatch(ActionTypes.httpGetScopes(jobId));

    return fetch(
      `/jobs/${jobId}/scopes`,
      {
        method: 'GET',
        headers: getState().headers,
      }, dispatch)
      .then(response => response.json())
      .then((json) => {
        dispatch(ActionTypes.httpRespScopes(json));
        dispatch(joinActions.jobScopes(jobId, json));
        return json.data;
      });
  };
}
