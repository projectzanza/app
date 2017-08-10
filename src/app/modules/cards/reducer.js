import { Types as ActionTypes } from './actionTypes';
import { createEntityEntries } from '../../lib/reducers/utils';
import Card from './model';

export const initialState = {
  entities: {},
};

export default function cardsReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.HTTP_RESP_CARDS:
      return createEntityEntries(
        state,
        action.data.map(cardJson => new Card(cardJson)),
      );

    default:
      return state;
  }
}
