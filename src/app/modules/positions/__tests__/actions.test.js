import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as responses from '../__mocks__/position_responses';
import * as forms from '../__mocks__/position_forms';
import * as actions from '../actions';
import * as actionTypes from '../actionTypes';
import * as joinActionTypes from '../../../lib/reducers/join-actions';
import Config from '../../../config/app';

const mockStore = configureMockStore([thunk]);

describe('positionActions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('submitPosition', () => {
    it('creates HTTP_RESP_POSITIONS on create success', () => {
      const userId = 1;

      nock(Config.apiUrl)
        .post(`/positions`)
        .reply(200, responses.position);

      const positionIds = [responses.position.data.id];

      const expectedActions = [
        {
          type: actionTypes.Types.HTTP_RESP_POSITIONS,
          data: responses.position.data,
        },
        {
          type: joinActionTypes.Types.USER_POSITIONS,
          userId,
          positionIds,
          joinAction: 'merge',
        },
      ];

      const store = mockStore();
      return store.dispatch(actions.submitPosition(userId, forms.position))
        .then(() => {
          expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
        });
    });

    it('does a PUT request when position is already persisted', () => {
      const userId = 1;
      nock(Config.apiUrl)
        .put(`/positions`)
        .reply(200, responses.position);

      const store = mockStore();
      return store.dispatch(actions.submitPosition(userId, responses.position.data))
    });
  });

  describe('getPositions', () => {
    it('creates HTTP_RESP_POSITIONS on get success', () => {
      const userId = 1;

      nock(Config.apiUrl)
        .get(`/users/${userId}/positions`)
        .reply(200, responses.positions);

      const positionIds = responses.positions.data.map(position => position.id);

      const expectedActions = [
        {
          type: actionTypes.Types.HTTP_RESP_POSITIONS,
          data: responses.positions.data,
        },
        {
          type: joinActionTypes.Types.USER_POSITIONS,
          userId,
          positionIds,
          joinAction: 'merge',
        },
      ];

      const store = mockStore();
      return store.dispatch(actions.getPositions(userId))
        .then(() => {
          expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
        });
    });
  });

  describe('deletePosition', () => {
    it('creates HTTP_RESP_DELETE_POSITION on success', () => {
      const positionId = 1;
      const userId = 100;

      nock(Config.apiUrl)
        .delete(`/positions/${positionId}`)
        .reply(200, responses.deleteSuccess);

      const expectedActions = [
        {
          type: actionTypes.Types.HTTP_RESP_DELETE_POSITION,
          positionId,
        },
        {
          type: joinActionTypes.Types.USER_POSITION_DELETE,
          userId,
          positionId,
          joinAction: 'purge',
        },
      ];

      const store = mockStore();
      return store.dispatch(actions.deletePosition(userId, positionId))
        .then(() => {
          expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
        });
    })
  })
});
