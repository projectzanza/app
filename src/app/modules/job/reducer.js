import { Actions } from './actions';

export const initialState = {
  loading: false,
  tag_list: [],
  title: '',
  text: '',
  per_diem: 300,
};

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
