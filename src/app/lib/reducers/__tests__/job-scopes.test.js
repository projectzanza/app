import * as reducer from '../job-scopes';
import * as responses from '../../../modules/scopes/__mocks__/scope_responses';
import * as joinActions from '../join-actions';

describe('job scopes reducer', () => {
  describe('JOB_SCOPES', () => {
    it('should join job with scopes', () => {
      const jobId = 1;
      const action = joinActions.jobScopes(jobId, responses.scopes);
      const state = reducer.jobScopes(undefined, action);

      const scopeIds = responses.scopes.data.map((scope) => scope.id);
      expect(state.entities[1]).toEqual(expect.arrayContaining(scopeIds));
    });
  });

  describe('JOB_SCOPES_DELETE', () => {
    it('should remove the join between job and scope', () => {
      const jobId = 1;
      let action = joinActions.jobScopes(jobId, responses.scopes);
      let state = reducer.jobScopes(undefined, action);

      const deletedScope = responses.scopes.data[0];
      action = joinActions.jobScopesDelete(1, deletedScope.id);
      state = reducer.jobScopes(state, action);

      expect(state.entities[1].includes(deletedScope.id)).toEqual(false);
    })
  })
});
