import { Actions } from './actions';

export const initialState = {
  loading: false,
  tag_list: [],
  title: '',
  text: '',
  per_diem: 0,
};

const overrideNull = (state) => {
  const nextState = Object.assign({}, state);
  Object.keys(nextState).forEach((key) => {
    if (nextState[key] === null) {
      nextState[key] = initialState[key];
    }
  });
  return nextState;
};

export default function jobReducer(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case Actions.HTTP_POST_JOB:
      return Object.assign(
        {},
        state,
        { loading: true },
      );

    case Actions.HTTP_RESP_JOB:
      nextState = Object.assign(
        {},
        state,
        action.result,
        { loading: false },
      );
      return overrideNull(nextState);

    case Actions.HTTP_GET_JOB:
      return Object.assign(
        {},
        state,
        {
          loading: { id: action.id },
        },
      );

    case Actions.HTTP_PUT_JOB:
      return Object.assign(
        {},
        state,
        action.job,
        { loading: { id: action.job.id } },
      );

    default:
      return state;
  }
}
