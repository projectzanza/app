import reducer, { initialState } from '../reducer';
import * as actionTypes from '../actionTypes';
import * as responses from '../__mocks__/estimate_responses';

describe('estimate reducer', () => {
  it('should return an initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual(initialState);
  });

  describe('HTTP_RESP_ESTIMATES', () => {
    it('should return original state is undefined is specified', () => {
      const action = actionTypes.httpRespEstimates(responses.noEstimate);
      const state = reducer(undefined, action);
      expect(state).toEqual(initialState);
    });

    it('should place the estimate in the entities list', () => {
      const action = actionTypes.httpRespEstimates(responses.estimate);
      const state = reducer(undefined, action);
      expect(Object.keys(state.entities).length).toEqual(1);
    });
  });
});
