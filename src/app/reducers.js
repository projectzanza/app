import { combineReducers } from 'redux';
import { authStateReducer } from 'redux-auth';
import user from './user/reducers';

function app(state = {}) {
  return state;
}

export default combineReducers({
  app,
  auth: authStateReducer,
  user,
});
