import fetch from '../../lib/fetch/fetch';
import * as ActionTypes from './actionTypes';
import * as joinActions from '../../lib/reducers/join-actions';
import AlertController from '../alerts/controller';

const reviewResponseActions = (dispatch, json) => {
  dispatch(ActionTypes.httpRespReviews(json));
  dispatch(joinActions.jobReviews(json));
  dispatch(joinActions.userReviews(json));
  dispatch(joinActions.subjectReviews(json));
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
      .then((json) => {
        reviewResponseActions(dispatch, json);
      })
    .then(() => {
      const message = method === 'POST' ? 'Review created' : 'Review updated';
      AlertController.dispatchAlert(dispatch, 'success', message);
    });
}

export function getReviews(resource, id) {
  return (dispatch, getState) => fetch(
      `/${resource}/${id}/reviews`,
    {
      method: 'GET',
      headers: getState().headers,
    }, dispatch)

      .then((json) => {
        reviewResponseActions(dispatch, json);
      });
}
