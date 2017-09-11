import fetch from '../../lib/fetch/fetch';
import * as ActionTypes from './actionTypes';
import * as joinActions from '../../lib/reducers/join-actions';

const reviewResponseActions = (dispatch, json) => {
  dispatch(ActionTypes.httpRespReviews(json));
  dispatch(joinActions.jobReviews(json));
  dispatch(joinActions.userReviews(json));
};

export function submitReview(review) {
  let method = 'POST';
  let url = '/reviews';
  if (review.id) {
    method = 'PUT';
    url += `/${review.id}`;
  }

  return (dispatch, getState) => fetch(
    url,
    {
      method,
      body: JSON.stringify(review),
      headers: getState().headers,
    }, dispatch)
      .then(response => response.json())
      .then((json) => {
        reviewResponseActions(dispatch, json);
      });
}

export function getReviews(resource, id) {
  return (dispatch, getState) => fetch(
      `/${resource}/${id}/reviews`,
    {
      method: 'GET',
      headers: getState().headers,
    }, dispatch)
      .then(response => response.json())
      .then((json) => {
        reviewResponseActions(dispatch, json);
      });
}
