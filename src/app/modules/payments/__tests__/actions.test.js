import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actionTypes from '../actionTypes';
import * as actions from '../actions';
import Config from '../../../config/app';
import * as responses from '../__mocks__/payment_responses';

const mockStore = configureMockStore([thunk]);

describe('paymentActions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('postToken', () => {
    it('creates HTTP_POST_PAYMENTS_TOKEN', () => {
      const jobId = 1;
      nock(Config.apiUrl)
        .post('/payments/token')
        .reply(200, responses.tokenCreated);

      const expectedActions = [
        {
          type: actionTypes.Types.HTTP_POST_PAYMENTS_TOKEN,
          token: responses.stripeToken,
          jobId: 1,
        },
      ];

      const store = mockStore();

      return store.dispatch(actions.postToken(responses.stripeToken, jobId))
        .then(()=> {
          expect(store.getActions())
            .toEqual(expect.arrayContaining(expectedActions))
        });
    });
  });
});
