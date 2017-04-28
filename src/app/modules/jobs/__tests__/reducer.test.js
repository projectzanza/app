import reducer, { initialState } from '../reducer';
import * as actionTypes from '../actionTypes';
import * as responses from '../__mocks__/job_responses';
import Job from '../model';

describe('job reducer', () => {
  it('should return an initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual(initialState);
  });

  describe('HTTP_RESP_JOB', () => {
    it('should add the job to the list of entities', () => {
      const action = actionTypes.httpRespJob(responses.job);

      const state = reducer(undefined, action);
      expect(state.entities[responses.job.data.id]).toEqual(new Job(responses.job.data));
    });
  });

  describe('HTTP_RESP_JOBS', () => {
    it('should place the jobs by key into entities property', () => {
      const action = actionTypes.httpRespJobs(responses.jobs);
      const state = reducer(undefined, action);

      const jobIds = Object.keys(state.entities);
      expect(jobIds.length)
        .toEqual(responses.jobs.data.length);
    });
  });
});
