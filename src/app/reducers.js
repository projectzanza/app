import { combineReducers } from 'redux';
import user from './modules/user/reducer';
import jobs from './modules/jobs/reducer';
import headers from './lib/fetch/reducers';
import scopes from './modules/scopes/reducer';
import estimates from './modules/estimates/reducer';
import cards from './modules/cards/reducer';
import positions from './modules/positions/reducer';
import reviews from './modules/reviews/reducer';
import { userCollaboratingJobs, jobCollaboratingUsers } from './lib/reducers/user-collaborating-jobs';
import { userMatchingJobs, jobMatchingUsers } from './lib/reducers/user-matching-jobs';
import { jobScopes } from './lib/reducers/job-scopes';
import { userJobs } from './lib/reducers/user-jobs';
import { jobEstimates, userEstimates } from './lib/reducers/job-user-estimates';
import { userPositions } from './lib/reducers/user-positions';
import { userReviews, jobReviews } from './lib/reducers/job-user-reviews';


function app(state = {}) {
  return state;
}

export default combineReducers({
  app,
  cards,
  estimates,
  jobEstimates,
  userEstimates,
  headers,
  jobs,
  jobCollaboratingUsers,
  jobMatchingUsers,
  positions,
  userPositions,
  reviews,
  userReviews,
  jobReviews,
  scopes,
  jobScopes,
  user,
  userJobs,
  userCollaboratingJobs,
  userMatchingJobs,
});
