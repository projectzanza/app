import fetch from '../../lib/fetch/fetch';
import * as ActionTypes from './actionTypes';
import * as joinActions from '../../lib/reducers/join-actions';

export function submitPosition(userId, position) {
  return (dispatch, getState) => {
    let method = 'POST';
    let url = '/positions';
    if (position.id) {
      url += `/${position.id}`;
      method = 'PUT';
    }

    return fetch(
      url,
      {
        method,
        body: JSON.stringify(position),
        headers: getState().headers,
      }, dispatch)
      .then(response => response.json())
      .then((json) => {
        dispatch(ActionTypes.httpRespPositions(json));
        dispatch(joinActions.userPositions(userId, json));
      });
  };
}

export function getPositions(userId) {
  return (dispatch, getState) => fetch(
      `/users/${userId}/positions`,
    {
      method: 'GET',
      headers: getState().headers,
    }, dispatch)
      .then(response => response.json())
      .then((json) => {
        dispatch(ActionTypes.httpRespPositions(json));
        dispatch(joinActions.userPositions(userId, json));
      },
    );
}

export function deletePosition(userId, positionId) {
  return (dispatch, getState) => fetch(
      `/positions/${positionId}`,
    {
      method: 'DELETE',
      headers: getState().headers,
    }, dispatch)
      .then(() => {
        dispatch(ActionTypes.httpRespDeletePositions(positionId));
        dispatch(joinActions.userPositionDelete(userId, positionId));
      });
}
