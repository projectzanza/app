import { combineReducers } from 'redux';
import user from './user/reducers';
import headers from './lib/fetch/reducers';

function app(state = {}) {
  return state;
}

export default combineReducers({
  app,
  user,
  headers,
});
