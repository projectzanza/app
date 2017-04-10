import reducer, { initialState, reducerInitialState } from '../reducer';
import * as actions from '../actions';
import * as forms from '../__mocks__/job_forms';
import * as responses from '../__mocks__/job_responses';

describe('job reducer', () => {
  it('should return an initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual(reducerInitialState);
  });

  describe('HTTP_POST_JOB', () => {
    it('should set loading to true', () => {
      const action = actions.httpPostJob(forms.quickCreate);

      expect(reducer(undefined, action))
        .toEqual(
          Object.assign(
            {},
            reducerInitialState,
            { loading: true },
          ),
        );
    });
  });

  describe('HTTP_RESP_JOB', () => {
    it('should set loading to false and set response json', () => {
      const action = actions.httpRespJob(responses.job);

      expect(reducer({ loading: true }, action))
        .toEqual(
          Object.assign(
            {},
            { items: { [responses.job.data.id]: responses.job.data }},
            { loading: false },
          ),
        );
    });

    it('should override null values from the server with defaults', () => {
      const action = actions.httpRespJob(responses.jobNullValues);

      let state = reducer({ loading: true }, action);
      let job = state.items[responses.jobNullValues.data.id];
      let keys = Object.keys(job);

      keys.forEach((key) => {
        expect(job[key]).not.toBeNull();
      });
    });
  });

  describe('HTTP_GET_JOB', () => {
    it('should set loading to object with loading id', () => {
      const action = actions.httpGetJob(1);

      expect(reducer(undefined, action))
        .toEqual(
          Object.assign(
            {},
            reducerInitialState,
            { loading: { id: 1 } },
          ),
        );
    });
  });

  describe('HTTP_PUT_JOB', () => {
    it('should set loading to true', () => {
      const action = actions.httpPutJob(forms.existingJob);

      expect(reducer(undefined, action))
        .toEqual(
          Object.assign(
            {},
            reducerInitialState,
            { loading: { id: forms.existingJob.id } },
          ),
        );
    });
  });

  describe('HTTP_GET_JOBS', () => {
    it('should set loading to true', () => {
      const action = actions.httpGetJobs();

      expect(reducer(undefined, action))
        .toEqual(
          Object.assign(
            {},
            reducerInitialState,
            { loading: true },
          ),
        );
    });
  });

  describe('HTTP_RESP_JOBS', () => {
    it('should place the jobs by key into items property', () => {
      const action = actions.httpRespJobs(responses.jobs);
      let state = reducer(undefined, action);

      const jobIds = Object.keys(state.items);
      expect(jobIds.length)
        .toEqual(responses.jobs.data.length);
    });
  });
});
