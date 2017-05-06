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

export function postStateScope(jobId, scopeId, state) {
  if (['complete', 'verify', 'reject'].indexOf(state) < 0) {
    throw new Error(`${state} is not a valid state for scopes`);
  }

  return (dispatch, getState) => {
    dispatch(ActionTypes.httpGetScopes(jobId));

    return fetch(
      `/scopes/${scopeId}/${state}`,
      {
        method: 'POST',
        headers: getState().headers,
      }, dispatch)
      .then(response => response.json())
      .then((json) => {
        dispatch(ActionTypes.httpRespScopes(json));
        dispatch(joinActions.jobScopes(jobId, json));
      });
  };
}
