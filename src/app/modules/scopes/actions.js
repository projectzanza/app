import fetch from '../../lib/fetch/fetch';
import * as ActionTypes from './actionTypes';
import * as joinActions from '../../lib/reducers/join-actions';

export function submitScope(jobId, scope) {
  return (dispatch, getState) => {
    dispatch(ActionTypes.httpPostScope(jobId, scope));

    let method = 'POST';
    let url = `/jobs/${jobId}/scopes`;

    if (scope.id) {
      method = 'PUT';
      url = `/scopes/${scope.id}`;
    }

    return fetch(
      url,
      {
        method,
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


export function deleteScope(jobId, scopeId) {
  return (dispatch, getState) => fetch(
      `/scopes/${scopeId}`,
    {
      method: 'DELETE',
      headers: getState().headers,
    }, dispatch)
      .then(() => {
        dispatch(ActionTypes.httpRespDeleteScope(scopeId));
        dispatch(joinActions.jobScopesDelete(jobId, scopeId));
      });
}
