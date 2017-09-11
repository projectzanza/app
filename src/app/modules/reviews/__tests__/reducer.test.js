import reducer, { initialState } from '../reducer';
import * as actionTypes from '../actionTypes';
import * as responses from '../__mocks__/review_responses';

describe('review reducer', () => {
  it('should return an initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual(initialState);
  });

  describe('HTTP_RESP_REVIEWS', () => {
    it('should add the reviews to the list of entries', () => {
      const action = actionTypes.httpRespReviews(responses.reviews);
      const state = reducer(undefined, action);
      const entityIds = Object.keys(state.entities);
      const reviewIds = responses.reviews.data.map(review => String(review.id));
      expect(entityIds).toEqual(reviewIds);
    });

    it('should add a single review to the list of entires', () => {
      const action = actionTypes.httpRespReviews(responses.review);
      const state = reducer(undefined, action);

      expect(state.entities[responses.review.data.id]).toBeTruthy();
    });
  });
});
