import { Types as ActionTypes } from './actionTypes';
import { createEntityEntries } from '../../lib/reducers/utils';
import Review from './model';

export const initialState = {
  entities: {},
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.HTTP_RESP_REVIEWS:
      return createEntityEntries(
        state,
        action.data.map(reviewJson => new Review(reviewJson)),
      );

    default:
      return state;
  }
};

export default reviewReducer;
