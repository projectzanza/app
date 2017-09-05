import fetch from '../../lib/fetch/fetch';
import * as ActionTypes from './actionTypes';
import * as joinActions from '../../lib/reducers/join-actions';

export function submitPosition(userId, position) {
  return (dispatch, getState) => {
    const method = position.id ? 'PUT' : 'POST';

    return fetch(
      '/positions',
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
