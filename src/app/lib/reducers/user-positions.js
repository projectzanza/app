import { Types } from './join-actions';
import { updateJoinTableState } from './utils';

export const initialState = {
  entities: {},
};

export const userPositions = (state = initialState, action) => {
  switch (action.type) {
    case Types.USER_POSITIONS:
      return updateJoinTableState(state, action.userId, action.positionIds, action.joinAction);

    case Types.USER_POSITION_DELETE:
      return updateJoinTableState(state, action.userId, action.positionId, action.joinAction);

    default:
      return state;
  }
};
