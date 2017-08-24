import _ from 'lodash';
import * as reducer from '../job-user-estimates';
import * as joinActionTypes from '../join-actions'
import * as responses from '../../../modules/jobs/__mocks__/job_responses';

describe('job estimates reducer', () => {
  it('should return an initial state', () => {
    expect(reducer.jobEstimates(undefined, {}))
      .toEqual(reducer.initialState);
  });

  describe('JOB_ESTIMATES', () => {
    it('should record the job and estimate join ids', () => {
      const estimates = _.flatten(responses.jobsWithEstimates.data.map(job => job.meta.current_user.estimates));
      const action = joinActionTypes.jobEstimates({ data: estimates });

      const state = reducer.jobEstimates(undefined, action);
      expect(state.entities['1']).toEqual([1000, 1010]);
    });
  });
});

describe('user estimates reducer', () => {
  it('should return an initial state', () => {
    expect(reducer.userEstimates(undefined, {}))
      .toEqual(reducer.initialState);
  });

  describe('USER_ESTIMATES', () => {
    it('should record the user and estimate join ids', () => {
      const estimates = _.flatten(responses.jobsWithEstimates.data.map(job => job.meta.current_user.estimates));
      const action = joinActionTypes.userEstimates({ data: estimates });

      const state = reducer.userEstimates(undefined, action);
      expect(state.entities['1100']).toEqual([1000, 1010]);
    });
  });
});
