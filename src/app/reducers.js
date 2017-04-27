import { combineReducers } from 'redux';
import user from './modules/user/reducer';
import jobs from './modules/jobs/reducer';
import headers from './lib/fetch/reducers';
import { userMatchingJobs, jobMatchingUsers } from './lib/reducers/user-matching-jobs';
import { userJobs } from './lib/reducers/user-jobs';

function app(state = {}) {
  return state;
}

export default combineReducers({
  app,
  user,
  headers,
  jobs,
  userJobs,
  userMatchingJobs,
  jobMatchingUsers,
});
