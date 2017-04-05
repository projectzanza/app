import { Actions } from './actions';

export const initialState = {
  results: [],
  loading: false,
};

export default function jobsReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.HTTP_GET_JOBS:
      return Object.assign(
        {},
        state,
        {
          loading: true,
        },
      );

    case Actions.HTTP_RESP_JOBS:
      return Object.assign(
        {},
        state,
        {
          results: action.result,
          loading: false,
        },
      );

    default:
      return state;
  }
}
