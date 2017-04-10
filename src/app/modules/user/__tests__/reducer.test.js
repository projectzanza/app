import reducer, { initialState } from '../reducer';
import * as actions from '../actions';
import * as responses from '../__mocks__/user_responses';
import * as forms from '../__mocks__/user_forms';

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual(initialState);
  });

  describe('HTTP_POST_SIGNIN', () => {
    it('should not store the password in the store', () => {
      const action = actions.httpPostSignIn(forms.signin);

      expect(reducer(undefined, action))
        .toEqual(initialState);
    });
  });

  describe('HTTP_RESP_AUTH', () => {
    it('should leave authenticated as false', () => {
      const action = actions.httpRespAuth(responses.user);

      const state = reducer(undefined, action);
      expect(state.items[responses.user.data.id].authenticated).toEqual(false);
    });

    it('should set currentUser', () => {
      const action = actions.httpRespAuth(responses.user);

      const state = reducer(undefined, action);
      expect(state.currentUser).toEqual(responses.user.data.id);
    });
  });

  describe('HTTP_RESP_SIGNIN', () => {
    it('should set authenticated as true', () => {
      const action = actions.httpRespSignIn(responses.user);
      const state = reducer(undefined, action);
      expect(state.items[responses.user.data.id].authenticated).toEqual(true);
    });

    it('should set currentUser', () => {
      const action = actions.httpRespSignIn(responses.user);

      const state = reducer(undefined, action);
      expect(state.currentUser).toEqual(responses.user.data.id);
    });
  });

  describe('HTTP_RESP_SIGNOUT', () => {
    it('should set authenticated as false and remove user details', () => {
      let action = actions.httpRespSignIn(responses.user);
      let state = reducer(undefined, action);

      action = actions.httpRespSignOut(responses.signOutJson);
      state = reducer(state, action);

      expect(state.currentUser).toEqual(undefined);
      expect(state.items[responses.user.data.id].authenticated).toEqual(false);
    });
  });
});
