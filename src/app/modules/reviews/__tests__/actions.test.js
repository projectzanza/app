import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as responses from '../__mocks__/review_responses';
import * as forms from '../__mocks__/review_forms';
import * as actions from '../actions';
import * as actionTypes from '../actionTypes';
import * as joinActionTypes from '../../../lib/reducers/join-actions';
import Config from '../../../config/app';

const mockStore = configureMockStore([thunk]);

describe('reviewActions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('submitReview', () => {
    it('creates action types and join types on create success', () => {
      nock(Config.apiUrl)
        .post('/reviews')
        .reply(200, responses.review);

      const expectedActions = [
        {
          type: actionTypes.Types.HTTP_RESP_REVIEWS,
          data: [responses.review.data],
        },
        {
          type: joinActionTypes.Types.USER_REVIEWS,
          data: [responses.review.data],
          joinAction: 'merge',
        },
        {
          type: joinActionTypes.Types.JOB_REVIEWS,
          data: [responses.review.data],
          joinAction: 'merge',
        },
      ];

      const store = mockStore();
      return store.dispatch(actions.submitReview(forms.review))
        .then(() => {
          expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
        });
    });
  });

  describe('getReviews', () => {
    it('makes a request to /jobs/:job_id/reviews for job reviews', () => {
      const jobId = 1;

      nock(Config.apiUrl)
        .get(`/jobs/${jobId}/reviews`)
        .reply(200, responses.review);

      const expectedActions = [
        {
          type: actionTypes.Types.HTTP_RESP_REVIEWS,
          data: [responses.review.data],
        },
        {
          type: joinActionTypes.Types.USER_REVIEWS,
          data: [responses.review.data],
          joinAction: 'merge',
        },
        {
          type: joinActionTypes.Types.JOB_REVIEWS,
          data: [responses.review.data],
          joinAction: 'merge',
        },
      ];

      const store = mockStore();
      return store.dispatch(actions.getReviews('jobs', jobId))
        .then(() => {
          expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
        });
    });

    it('makes a request to /jobs/:job_id/reviews for job reviews', () => {
      const userId = 1;

      nock(Config.apiUrl)
        .get(`/users/${userId}/reviews`)
        .reply(200, responses.reviews);

      const expectedActions = [
        {
          type: actionTypes.Types.HTTP_RESP_REVIEWS,
          data: responses.reviews.data,
        },
        {
          type: joinActionTypes.Types.USER_REVIEWS,
          data: responses.reviews.data,
          joinAction: 'merge',
        },
        {
          type: joinActionTypes.Types.JOB_REVIEWS,
          data: responses.reviews.data,
          joinAction: 'merge',
        },
      ];

      const store = mockStore();
      return store.dispatch(actions.getReviews('users', userId))
        .then(() => {
          expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
        });
    });
  });
});

