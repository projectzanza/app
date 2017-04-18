import { Actions } from './actions';
import { overrideNull } from '../../lib/reducers/utils';

export const initialState = {
  loading: false,
  tag_list: [],
  title: '',
  text: '',
  per_diem: { min: 0, max: 1000 },
  proposed_start_at: '',
  proposed_end_at: '',
  allow_contact: true,
};

export const reducerInitialState = {
  items: {},
  resultIds: [],
};

export default function jobReducer(state = reducerInitialState, action) {
  let nextState;
  let jobEntry = {};

  switch (action.type) {
    case Actions.HTTP_POST_JOB:
      return Object.assign(
        {},
        state,
        { loading: true },
      );

    case Actions.HTTP_GET_JOB:
      return Object.assign(
        {},
        state,
        { loading: { id: action.id } },
      );

    case Actions.HTTP_PUT_JOB:
      return Object.assign(
        {},
        state,
        { loading: { id: action.job.id } },
      );

    case Actions.HTTP_GET_JOBS:
      return Object.assign(
        {},
        state,
        { loading: true },
      );

    case Actions.HTTP_RESP_JOB:
      nextState = Object.assign(
        {},
        state.items,
        { [action.data.id]: overrideNull(initialState, action.data) },
      );

      return Object.assign(
        {},
        state,
        { items: nextState },
        { loading: false },
      );

    case Actions.HTTP_RESP_JOBS:
      jobEntry = action.data.reduce(
        (jobs, job) => (Object.assign(jobs, { [job.id]: overrideNull(initialState, job) })),
        {},
      );

      nextState = Object.assign(
        {},
        state.items,
        jobEntry,
      );

      return Object.assign(
        {},
        state,
        {
          items: nextState,
          resultIds: Object.keys(jobEntry),
          loading: false,
        },
      );

    default:
      return state;
  }
}
