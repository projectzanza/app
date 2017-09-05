import reducer, { initialState } from '../reducer';
import * as actionTypes from '../actionTypes';
import * as responses from '../__mocks__/position_responses';

describe('position reducer', () => {
  it('should return an initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual(initialState);
  });

  describe('HTTP_RESP_POSITIONS', () => {
    it('should add the positions to the list of entries', () => {
      const action = actionTypes.httpRespPositions(responses.positions);
      const state = reducer(undefined, action);
      const entityIds = Object.keys(state.entities);
      const positionIds = responses.positions.data.map(position => String(position.id));
      expect(entityIds).toEqual(positionIds);
    });

    it('should add a single position to the list of entires', () => {
      const action = actionTypes.httpRespPositions(responses.position);
      const state = reducer(undefined, action);

      expect(state.entities[responses.position.data.id]).toBeTruthy();
    })
  });


  describe('HTTP_RESP_DELETE_POSITION', () => {
    it('should remove the position from the entities list', () => {
      let action = actionTypes.httpRespPositions(responses.positions);
      let state = reducer(undefined, action);
      const positionId = responses.positions.data[0].id;
      action = actionTypes.httpRespDeletePositions(positionId);
      state = reducer(state, action);

      expect(state.entities[positionId]).toBeFalsy();
    });
  });

});
