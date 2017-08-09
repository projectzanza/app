import reducer, { initialState } from '../reducer';
import * as actionTypes from '../actionTypes';
import * as responses from '../__mocks__/payment_responses';

describe('payment reducer', () => {
  it('should return an initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual(initialState);
  });

  describe('HTTP_RESP_CARDS', () => {
    it('should place the cards by key into entities property', () => {
      const action = actionTypes.httpRespCards(responses.cards);
      const state = reducer(undefined, action);

      const cardsIds = Object.keys(state.entities);
      expect(cardsIds.length)
        .toEqual(responses.cards.data.length);
    });
  });
});
