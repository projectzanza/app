import _ from 'lodash';
import * as reducer from '../job-user-estimates';
import * as joinActionTypes from '../join-actions'
import * as responses from '../../../modules/jobs/__mocks__/job_responses';

describe('job estimates reducer', () => {
  const estimates = _.flatten(responses.jobsWithEstimates.data.map(job => job.meta.current_user.estimates));

  it('should return an initial state', () => {
    expect(reducer.jobEstimates(undefined, {}))
      .toEqual(reducer.initialState);
  });

  describe('JOB_ESTIMATES', () => {
    it('should record the job and estimate join ids', () => {
      const action = joinActionTypes.jobEstimates({ data: estimates });

      const state = reducer.jobEstimates(undefined, action);
      expect(state.entities['1']).toEqual([1000, 1010]);
    });
  });

  describe('JOB_ESTIMATES_DELETE', () => {
    it('should remove the join between job and estimate', () => {
      let action = joinActionTypes.jobEstimates({ data: estimates });
      let state = reducer.jobEstimates(undefined, action);

      const deletedEstimate = estimates[0];
      const jobId = deletedEstimate.job_id;

      action = joinActionTypes.jobEstimateDelete(deletedEstimate);
      state = reducer.jobEstimates(state, action);

      expect(state.entities[jobId].includes(deletedEstimate.id)).toEqual(false);
    });
  });
});

describe('user estimates reducer', () => {
  const estimates = _.flatten(responses.jobsWithEstimates.data.map(job => job.meta.current_user.estimates));

  it('should return an initial state', () => {
    expect(reducer.userEstimates(undefined, {}))
      .toEqual(reducer.initialState);
  });

  describe('USER_ESTIMATES', () => {
    it('should record the user and estimate join ids', () => {
      const action = joinActionTypes.userEstimates({ data: estimates });

      const state = reducer.userEstimates(undefined, action);
      expect(state.entities['1100']).toEqual([1000, 1010]);
    });
  });

  describe('USER_ESTIMATES_DELETE', () => {
    it('should remove the join between user and estimate', () => {
      let action = joinActionTypes.userEstimates({ data: estimates });
      let state = reducer.userEstimates(undefined, action);

      const deletedEstimate = estimates[0];
      const userId = deletedEstimate.user_id;

      action = joinActionTypes.userEstimateDelete(deletedEstimate);
      state = reducer.userEstimates(state, action);

      expect(state.entities[userId].includes(deletedEstimate.id)).toEqual(false);
    })
  })
});
