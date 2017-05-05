import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../actions';
import * as actionTypes from '../actionTypes';
import * as joinActionTypes from '../../../lib/reducers/join-actions';
import * as responses from '../__mocks__/user_responses';
import * as forms from '../__mocks__/user_forms';
import Config from '../../../config/app';

const mockStore = configureMockStore([thunk]);

describe('userActions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('createUser', () => {
    it('creates HTTP_RESP_AUTH on create success', () => {
      nock(Config.apiUrl)
        .post('/auth')
        .reply(200, responses.user);

      const expectedActions = [
        {
          type: actionTypes.Types.HTTP_POST_AUTH,
          user: forms.signup,
        },
        {
          type: actionTypes.Types.HTTP_RESP_USER,
          data: responses.user.data,
        },
      ];

      const store = mockStore();

      return store.dispatch(actions.createUser(forms.signup))
        .then(() => {
          expect(store.getActions())
            .toEqual(expect.arrayContaining(expectedActions));
        });
    });
  });

  describe('loginUser', () => {
    it('creates HTTP_RESP_SIGIN on login success', () => {
      nock(Config.apiUrl)
        .post('/auth/sign_in')
        .reply(200, responses.user);

      const expectedActions = [
        {
          type: actionTypes.Types.HTTP_POST_SIGNIN,
          user: forms.signin,
        },
        {
          type: actionTypes.Types.HTTP_RESP_USER,
          data: responses.user.data,
        },
        {
          type: actionTypes.Types.HTTP_RESP_SIGNIN,
          data: responses.user.data,
        },
      ];

      const store = mockStore();

      return store.dispatch(actions.loginUser(forms.signin))
        .then(() => {
          expect(store.getActions())
            .toEqual(expect.arrayContaining(expectedActions));
        });
    });
  });

  describe('logoutUser', () => {
    it('creates HTTP_RESP_SIGNOUT on logout success', () => {
      nock(Config.apiUrl)
        .delete('/auth/sign_out')
        .reply(200, responses.signOut);

      const expectedActions = [
        {
          type: actionTypes.Types.HTTP_RESP_SIGNOUT,
        },
      ];

      const store = mockStore();

      return store.dispatch(actions.logoutUser())
        .then(() => {
          expect(store.getActions())
            .toEqual(expect.arrayContaining(expectedActions));
        });
    });
  });

  describe('getUser', () => {
    it('creates HTTP_USER_RESP on success', () => {
      nock(Config.apiUrl)
        .get(`/users/${responses.user.data.id}`)
        .reply(200, responses.user);

      const expectedActions = [
        {
          type: actionTypes.Types.HTTP_RESP_USER,
          data: responses.user.data,
        },
      ];

      const store = mockStore();

      return store.dispatch(actions.getUser(responses.user.data.id))
        .then(() => {
          expect(store.getActions())
            .toEqual(expect.arrayContaining(expectedActions));
        });
    });
  });

  describe('putUser', () => {
    it('creates HTTP_USER_RESP on success', () => {
      nock(Config.apiUrl)
        .put(`/users/${forms.profile.id}`)
        .reply(200, responses.user);

      const expectedActions = [
        {
          type: actionTypes.Types.HTTP_RESP_USER,
          data: responses.user.data,
        },
      ];

      const store = mockStore();

      return store.dispatch(actions.putUser(forms.profile))
        .then(() => {
          expect(store.getActions())
            .toEqual(expect.arrayContaining(expectedActions));
        });
    });
  });

  describe('getMatchingUsersForJob', () => {
    it('creates HTTP_RESP_USERS on success', () => {
      const jobId = 1;
      nock(Config.apiUrl)
        .get(`/jobs/${jobId}/users/match`)
        .reply(200, responses.users);

      const expectedActions = [
        {
          type: actionTypes.Types.HTTP_GET_USERS,
        },
        {
          type: actionTypes.Types.HTTP_RESP_USERS,
          data: responses.users.data,
        },
        {
          type: joinActionTypes.Types.JOB_MATCHING_USERS,
          userIds: responses.users.data.map(user => user.id),
          jobId,
          joinAction: 'reset',
        },
      ];

      const store = mockStore();

      return store.dispatch(actions.getMatchingUsersForJob({ jobId }))
        .then(() => {
          expect(store.getActions())
            .toEqual(expect.arrayContaining(expectedActions));
        });
    });
  });

  describe('getCollaboratingUsersForJob', () => {
    it('creates HTTP_RESP_USERS and on success', () => {
      const jobId = 1;
      nock(Config.apiUrl)
        .get(`/jobs/${jobId}/users/collaborating`)
        .reply(200, responses.users);

      const expectedActions = [
        {
          type: actionTypes.Types.HTTP_GET_USERS,
        },
        {
          type: actionTypes.Types.HTTP_RESP_USERS,
          data: responses.users.data,
        },
        {
          type: joinActionTypes.Types.JOB_COLLABORATING_USERS,
          userIds: responses.users.data.map(user => user.id),
          jobId,
          joinAction: 'reset',
        },
      ];

      const store = mockStore();

      return store.dispatch(actions.getCollaboratingUsersForJob({ jobId }))
        .then(() => {
          expect(store.getActions())
            .toEqual(expect.arrayContaining(expectedActions));
        });
    });
  });

  describe('postInviteToJob', () => {
    it('creates HTTP_RESP_USERS on success', () => {
      const userId = 1;

      nock(Config.apiUrl)
        .post(`/users/${userId}/invite`)
        .reply(200, responses.users);

      const expectedActions = [
        {
          type: actionTypes.Types.HTTP_RESP_USERS,
          data: responses.users.data,
        },
      ];

      const store = mockStore();

      return store.dispatch(actions.postInviteToJob({ jobId: 1, userId, resultsId: '123' }))
        .then(() => {
          expect(store.getActions())
            .toEqual(expect.arrayContaining(expectedActions));
        });
    });
  });
});
