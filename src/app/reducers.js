import { combineReducers } from 'redux';
import user from './modules/user/reducer';
import jobs from './modules/jobs/reducer';
import headers from './lib/fetch/reducers';
import scopes from './modules/scopes/reducer';
import estimates from './modules/estimates/reducer';
import cards from './modules/cards/reducer';
import positions from './modules/positions/reducer';
import { userCollaboratingJobs, jobCollaboratingUsers } from './lib/reducers/user-collaborating-jobs';
import { userMatchingJobs, jobMatchingUsers } from './lib/reducers/user-matching-jobs';
import { jobScopes } from './lib/reducers/job-scopes';
import { userJobs } from './lib/reducers/user-jobs';
import { jobEstimates, userEstimates } from './lib/reducers/job-user-estimates';
import { userPositions } from './lib/reducers/user-positions';


function app(state = {}) {
  return state;
}

export default combineReducers({
  app,
  headers,
  user,
  userJobs,
  userCollaboratingJobs,
  userMatchingJobs,
  jobs,
  jobCollaboratingUsers,
  jobMatchingUsers,
  scopes,
  jobScopes,
  estimates,
  jobEstimates,
  userEstimates,
  positions,
  userPositions,
  cards,
});
