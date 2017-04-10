import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../actions';
import * as responses from '../__mocks__/user_responses';
import * as forms from '../__mocks__/user_forms';
import Config from '../../../config/app';

const mockStore = configureMockStore([thunk]);

describe('createUser', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates HTTP_RESP_AUTH on create success', () => {
    nock(Config.apiUrl)
      .post('/auth')
      .reply(200, responses.user);

    const expectedActions = [
      {
        type: actions.Actions.HTTP_POST_AUTH,
        user: forms.signup,
      },
      {
        type: actions.Actions.HTTP_RESP_AUTH,
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
