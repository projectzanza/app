import { Types as ActionTypes } from './actionTypes';
import {
  createEntityEntries,
  deleteEntityEntries,
} from '../../lib/reducers/utils';

export const initialState = {
  entities: {},
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_ALERT:
      return createEntityEntries(
        state,
        [action.alert],
      );

    case ActionTypes.DELETE_ALERT:
      return deleteEntityEntries(
        state,
        action.id,
      );

    default:
      return state;
  }
};

export default alertReducer;
