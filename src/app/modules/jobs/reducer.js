import { Actions } from './actions';
import { overrideNull } from '../../lib/reducers/utils';

export const initialState = {
  loading: false,
  tag_list: [],
  title: '',
  text: '',
  per_diem: { min: 0, max: 1000 },
  proposed_start_at: 0,
  proposed_end_at: 0,
  allow_contact: true,
};

export const reducerInitialState = {
  items: {},
  results: {},
};

export default function jobReducer(state = reducerInitialState, action) {
  let nextState;
  let resultState;
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
      nextState = Object.assign(
        {},
        state.results,
        { [action.resultsId]: [] },
      );

      return Object.assign(
        {},
        state,
        { results: nextState },
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

      resultState = Object.assign(
        {},
        state.results,
        { [action.resultsId]: Object.keys(jobEntry) },
      );

      return Object.assign(
        {},
        state,
        {
          items: nextState,
          results: resultState,
          loading: false,
        },
      );

    default:
      return state;
  }
}
