import reducer, { initialState } from '../reducer';
import * as actionTypes from '../actionTypes';
import * as responses from '../__mocks__/user_responses';
import * as forms from '../__mocks__/user_forms';

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual(initialState);
  });

  describe('HTTP_POST_SIGNIN', () => {
    it('should not store the password in the store', () => {
      const action = actionTypes.httpPostSignIn(forms.signin);

      expect(reducer(undefined, action))
        .toEqual(initialState);
    });
  });

  describe('HTTP_RESP_AUTH', () => {
    it('should not set currentUser', () => {
      const action = actionTypes.httpRespAuth(responses.user);

      const state = reducer(undefined, action);
      expect(state.currentUser).toEqual(undefined);
    });
  });

  describe('HTTP_RESP_SIGNIN', () => {
    it('should set currentUser', () => {
      const action = actionTypes.httpRespSignIn(responses.user);

      const state = reducer(undefined, action);
      expect(state.currentUser).toEqual(responses.user.data.id);
    });
  });

  describe('HTTP_RESP_SIGNOUT', () => {
    it('should set currentUser as undefined', () => {
      let action = actionTypes.httpRespSignIn(responses.user);
      let state = reducer(undefined, action);

      action = actionTypes.httpRespSignOut(responses.signOutJson);
      state = reducer(state, action);

      expect(state.currentUser).toEqual(undefined);
    });
  });

  describe('HTTP_RESP_USERS', () => {
    it('should add the users to the items list', () => {
      const action = actionTypes.httpRespUsers(responses.users);
      const state = reducer(undefined, action);

      expect(Object.keys(state.entities).length).toEqual(responses.users.data.length);
    });
  });
});
