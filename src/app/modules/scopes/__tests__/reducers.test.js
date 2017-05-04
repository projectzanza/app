import reducer, { initialState } from '../reducer';
import * as actionTypes from '../actionTypes';
import * as responses from '../__mocks__/scope_responses';

describe('scope reducer', () => {
  it('should return an initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual(initialState);
  });

  describe('HTTP_RESP_SCOPES', () => {
    it('should add the scopes to the list of entities', () => {
      const action = actionTypes.httpRespScopes(responses.scopes);
      const state = reducer(undefined, action);
      const entityIds = Object.keys(state.entities);
      const scopeIds = responses.scopes.data.map(scope => String(scope.id));

      expect(entityIds).toEqual(scopeIds);
    });

    it('should return the original state if there are no scopes', () => {
      const action = actionTypes.httpRespScopes(responses.noScopes);
      const state = reducer(undefined, action);

      expect(state).toEqual(initialState);
    });
  });
});
