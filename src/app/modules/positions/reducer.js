import { Types as ActionTypes } from './actionTypes';
import {
  createEntityEntries,
  deleteEntityEntries,
} from '../../lib/reducers/utils';
import Position from './model';

export const initialState = {
  entities: {},
};

const positionReducer = (state = initialState, action) => {
  let data = [];

  switch (action.type) {
    case ActionTypes.HTTP_RESP_POSITIONS:
      data = [].concat(action.data);

      return createEntityEntries(
        state,
        data.map(positionJson => new Position(positionJson)),
      );

    case ActionTypes.HTTP_RESP_DELETE_POSITION:
      return deleteEntityEntries(
        state,
        action.positionId,
      );

    default:
      return state;
  }
};

export default positionReducer;
