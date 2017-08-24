import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actionTypes from '../actionTypes';
import * as actions from '../actions';
import * as joinActionTypes from '../../../lib/reducers/join-actions';
import * as responses from '../__mocks__/estimate_responses';
import * as forms from '../__mocks__/estimate_forms';
import Config from '../../../config/app';

const mockStore = configureMockStore([thunk]);

describe('jobActions', () => {
  afterEach(() => {
    nock.cleanAll();
  });


  describe('submitEstimate', () => {
    it('POSTs to /estimates on creating a new estimate, meaning no id is set for estimate object', () => {
      nock(Config.apiUrl)
        .post('/estimates')
        .reply(200, responses.estimate);

      const store = mockStore();
      return store.dispatch(actions.submitEstimate(1, 1, forms.estimate));
    });
  });

  it('PUTS to /estimates/:id when submitting an estimate with an id', () => {
    const estimate = Object.assign({ id: 1 }, forms.estimate);
    const jobId = 1000;
    nock(Config.apiUrl)
      .put(`/estimates/${estimate.id}`)
      .reply(200, responses.estimate);

    const store = mockStore();
    return store.dispatch(actions.submitEstimate(jobId, estimate));
  });

  it('dispatches the correct events on success', () => {
    const jobId = 1;
    const userId = 1;
    nock(Config.apiUrl)
      .post('/estimates')
      .reply(200, responses.estimate);

    const expectedActions = [
      {
        type: actionTypes.Types.HTTP_RESP_ESTIMATES,
        data: [responses.estimate.data],
      },
      {
        type: joinActionTypes.Types.JOB_ESTIMATES,
        data: responses.estimate.data,
        joinAction: 'merge',
      },
      {
        type: joinActionTypes.Types.USER_ESTIMATES,
        data: responses.estimate.data,
        joinAction: 'merge',
      },
    ];

    const store = mockStore();

    return store.dispatch(actions.submitEstimate(jobId, userId, forms.estimate))
    .then(() => {
      expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
    });
  });

  describe('deleteEstimate', () => {
    it('dispatches the correct events on success', () => {
      const estimate = { id: 1 };
      nock(Config.apiUrl)
        .delete(`/estimates/${estimate.id}`)
        .reply(200, responses.deleteEstimate);

      const expectedActions = [
        {
          type: actionTypes.Types.HTTP_RESP_DELETE_ESTIMATE,
          data: estimate,
        },
        {
          type: joinActionTypes.Types.JOB_ESTIMATES_DELETE,
          data: estimate,
          joinAction: 'purge',
        },
        {
          type: joinActionTypes.Types.USER_ESTIMATES_DELETE,
          data: estimate,
          joinAction: 'purge',
        },
      ];
      const store = mockStore();
      return store.dispatch(actions.deleteEstimate(estimate))
        .then(() => {
          expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
        })
    });
  });
});
