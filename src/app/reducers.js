import { combineReducers } from 'redux';
import user from './modules/user/reducer';
import job from './modules/job/reducer';
import jobs from './modules/jobs/reducer';
import headers from './lib/fetch/reducers';

function app(state = {}) {
  return state;
}

export default combineReducers({
  app,
  user,
  headers,
  job,
  jobs,
});
