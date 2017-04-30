import { combineReducers } from 'redux';
import user from './modules/user/reducer';
import jobs from './modules/jobs/reducer';
import headers from './lib/fetch/reducers';
import { userMatchingJobs, jobMatchingUsers } from './lib/reducers/user-matching-jobs';
import { jobInvitedUsers, userInvitedJobs } from './lib/reducers/user-invited-jobs';
import { userInterestedJobs, jobInterestedUsers } from './lib/reducers/user-interested-jobs';
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
  jobInvitedUsers,
  userInvitedJobs,
  userInterestedJobs,
  jobInterestedUsers,
});
