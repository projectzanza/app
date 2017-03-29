import { Actions } from './actions';

const initialState = { loading: false };

export default function jobReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.HTTP_POST_JOB:
      return Object.assign(
        {},
        state,
        { loading: true },
      );

    case Actions.HTTP_RESP_JOB:
      return Object.assign(
        {},
        state,
        action.result,
        { loading: false },
      );

    default:
      return state;
  }
}
