import reducer, { reducerInitialState } from '../reducer';
import * as actions from '../actions';
import * as responses from '../__mocks__/user_responses';
import * as forms from '../__mocks__/user_forms';

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual(reducerInitialState);
  });

  describe('HTTP_POST_SIGNIN', () => {
    it('should not store the password in the store', () => {
      const action = actions.httpPostSignIn(forms.signin);

      expect(reducer(undefined, action))
        .toEqual(reducerInitialState);
    });
  });

  describe('HTTP_RESP_AUTH', () => {
    it('should not set currentUser', () => {
      const action = actions.httpRespAuth(responses.user);

      const state = reducer(undefined, action);
      expect(state.currentUser).toEqual(undefined);
    });
  });

  describe('HTTP_RESP_SIGNIN', () => {
    it('should set currentUser', () => {
      const action = actions.httpRespSignIn(responses.user);

      const state = reducer(undefined, action);
      expect(state.currentUser).toEqual(responses.user.data.id);
    });
  });

  describe('HTTP_RESP_SIGNOUT', () => {
    it('should set currentUser as undefined', () => {
      let action = actions.httpRespSignIn(responses.user);
      let state = reducer(undefined, action);

      action = actions.httpRespSignOut(responses.signOutJson);
      state = reducer(state, action);

      expect(state.currentUser).toEqual(undefined);
    });
  });

  describe('HTTP_RESP_USERS', () => {
    it('should add the users to the items list, and place user ids in the results ids list', () => {
      const action = actions.httpRespUsers(responses.users);
      const state = reducer(undefined, action);

      expect(state.resultIds).toEqual(responses.users.data.map(user => user.id.toString()));
      expect(Object.keys(state.items).length).toEqual(responses.users.data.length);
    });
  });
});
