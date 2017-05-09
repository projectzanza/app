import { combineReducers } from 'redux';
import user from './modules/user/reducer';
import jobs from './modules/jobs/reducer';
import headers from './lib/fetch/reducers';
import scopes from './modules/scopes/reducer';
import estimates from './modules/estimates/reducer';
import { userCollaboratingJobs, jobCollaboratingUsers } from './lib/reducers/user-collaborating-jobs';
import { userMatchingJobs, jobMatchingUsers } from './lib/reducers/user-matching-jobs';
import { jobScopes } from './lib/reducers/job-scopes';
import { userJobs } from './lib/reducers/user-jobs';
import { jobEstimates, userEstimates } from './lib/reducers/job-user-estimates';


function app(state = {}) {
  return state;
}

export default combineReducers({
  app,
  user,
  headers,
  jobs,
  scopes,
  estimates,
  userJobs,
  userCollaboratingJobs,
  jobCollaboratingUsers,
  userMatchingJobs,
  jobMatchingUsers,
  jobScopes,
  jobEstimates,
  userEstimates,
});
