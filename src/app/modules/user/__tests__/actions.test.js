import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../actions';
import * as responses from '../__mocks__/user_responses';

const mockStore = configureMockStore([thunk]);

describe('createUser', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates HTTP_RESP_AUTH on create success', () => {
    nock('http://0.0.0.0:3000')
      .post('/auth')
      .reply(200, responses.authJson);

    const expectedActions = [
      {
        type: actions.Actions.HTTP_POST_AUTH,
        user: responses.authJson.data,
      },
      {
        type: actions.Actions.HTTP_RESP_AUTH,
        result: responses.authJson.data,
      },
    ];

    const store = mockStore();

    store.dispatch(actions.createUser(responses.authJson.data))
      .then(() => {
        expect(
          store.getActions(),
        ).toEqual(
          expect.arrayContaining(expectedActions),
        );
      });
  });
});
