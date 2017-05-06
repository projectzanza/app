import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as responses from '../__mocks__/scope_responses';
import * as forms from '../__mocks__/scope_forms';
import * as actions from '../actions';
import * as actionTypes from '../actionTypes';
import * as joinActionTypes from '../../../lib/reducers/join-actions';
import Config from '../../../config/app';

const mockStore = configureMockStore([thunk]);

describe('scopeActions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('createScope', () => {
    it('creates HTTP_RESP_SCOPE and JOB_SCOPES on create success', () => {
      const jobId = 1;

      nock(Config.apiUrl)
        .post(`/jobs/${jobId}/scopes`)
        .reply(200, responses.scopes);

      const expectedActions = [
        {
          type: actionTypes.Types.HTTP_POST_SCOPE,
          scope: forms.scope,
          jobId,
        },
        {
          type: actionTypes.Types.HTTP_RESP_SCOPES,
          data: responses.scopes.data,
        },
        {
          type: joinActionTypes.Types.JOB_SCOPES,
          scopeIds: responses.scopes.data.map(scope => scope.id),
          jobId,
        },
      ];

      const store = mockStore();
      return store.dispatch(actions.createScope(jobId, forms.scope))
        .then(() => {
          expect(store.getActions())
            .toEqual(expect.arrayContaining(expectedActions));
        });
    });
  });

  describe('getScopes', () => {
    it('creates HTTP_RESP_SCOPE and JOB_SCOPES on get success', () => {
      const jobId = 1;

      nock(Config.apiUrl)
        .get(`/jobs/${jobId}/scopes`)
        .reply(200, responses.scopes);

      const expectedActions = [
        {
          type: actionTypes.Types.HTTP_GET_SCOPES,
          jobId,
        },
        {
          type: actionTypes.Types.HTTP_RESP_SCOPES,
          data: responses.scopes.data,
        },
        {
          type: joinActionTypes.Types.JOB_SCOPES,
          scopeIds: responses.scopes.data.map(scope => scope.id),
          jobId,
        },
      ];

      const store = mockStore();
      return store.dispatch(actions.getScopes(jobId))
        .then(() => {
          expect(store.getActions())
            .toEqual(expect.arrayContaining(expectedActions));
        });
    });
  });

  describe('postStateScopes', () => {
    it('will throw an error if a valid state is not given', () => {
      const store = mockStore();

      const throwErrorfunc = () => {
        store.dispatch(actions.postStateScope(1, 1, 'invalidState'))
      };

      expect(throwErrorfunc).toThrowError(Error);
    });

    it('creates HTTP_RESP_SCOPES and JOB_SCOPES on post success', () => {
      const jobId = 1;
      const scopeId = 100;

      nock(Config.apiUrl)
        .post(`/scopes/${scopeId}/complete`)
        .reply(200, responses.scopes);

      const expectedActions = [
        {
          type: actionTypes.Types.HTTP_GET_SCOPES,
          jobId,
        },
        {
          type: actionTypes.Types.HTTP_RESP_SCOPES,
          data: responses.scopes.data,
        },
        {
          type: joinActionTypes.Types.JOB_SCOPES,
          scopeIds: responses.scopes.data.map(scope => scope.id),
          jobId,
        },
      ];

      const store = mockStore();
      return store.dispatch(actions.postStateScope(jobId, scopeId, 'complete'))
        .then(() => {
          expect(store.getActions())
            .toEqual(expect.arrayContaining(expectedActions));
        });
    });
  });
});
