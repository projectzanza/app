import reducer from '../reducer';
import * as actions from '../actions';
import * as responses from '../__mocks__/responses';
import * as forms from '../__mocks__/forms';

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {}),
    ).toEqual(
      { authenticated: false },
    );
  });

  describe('HTTP_POST_SIGNIN', () => {
    it('should not store the password in the store', () => {
      const action = actions.httpPostSignIn(
        Object.assign(
          {},
          forms.signin,
          { password: '1234' },
        ),
      );

      expect(
        reducer(undefined, action),
      ).toEqual(
        Object.assign(
          {},
          responses.authSignInJson.data,
          { authenticated: false },
        ),
      );
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
