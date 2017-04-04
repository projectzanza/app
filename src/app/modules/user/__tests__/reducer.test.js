import reducer from '../reducer';
import * as actions from '../actions';
import * as responses from '../__mocks__/user_responses';
import * as forms from '../__mocks__/user_forms';

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual({ authenticated: false });
  });

  describe('HTTP_POST_SIGNIN', () => {
    it('should not store the password in the store', () => {
      const action = actions.httpPostSignIn(forms.signin);
      const state = Object.assign(
        {},
        forms.signin,
        { authenticated: false },
      );
      delete state.password;

      expect(reducer(undefined, action))
        .toEqual(state);
    });
  });

  describe('HTTP_RESP_AUTH', () => {
    it('should leave authenticated as false', () => {
      const action = actions.httpRespAuth(responses.authJson);

      expect(
        reducer(undefined, action),
      ).toEqual(
        Object.assign({}, responses.authJson.data, { authenticated: false }),
      );
    });
  });

  describe('HTTP_RESP_SIGNIN', () => {
    it('should set authenticated as true', () => {
      const action = actions.httpRespSignIn(responses.authSignInJson);

      expect(
        reducer(undefined, action),
      ).toEqual(
        Object.assign({}, responses.authSignInJson.data, { authenticated: true }),
      );
    });
  });

  describe('HTTP_RESP_SIGNOUT', () => {
    it('should set authenticated as false and remove user details', () => {
      const action = actions.httpRespSignOut(responses.signOutJson);

      expect(
        reducer(undefined, action),
      ).toEqual(
        { authenticated: false },
      );
    });
  });
});
