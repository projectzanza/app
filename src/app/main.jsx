import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import 'react-datepicker/dist/react-datepicker.css';
// import createLogger from 'redux-logger';
import { Provider as ReduxProvider } from 'react-redux';
import Routes from './routes';
import rootReducer from './reducers';
import { loadState, saveState } from './localStorage';
import './css/app.scss';
import User from './modules/user/model';
import Alerts from './modules/alerts/container';

// const logger = createLogger();
const persistedState = loadState();
// User entities are searlized when put into local storage. means the User object is lost.
// On reload, de-seralize the persistedState, then convert the json back into User objects
if (persistedState && persistedState.user.entities) {
  const keys = Object.keys(persistedState.user.entities);
  keys.map((key) => {
    persistedState.user.entities[key] = new User(persistedState.user.entities[key]);
    return true;
  });
}

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunkMiddleware),
);

store.subscribe(() => {
  saveState({
    user: store.getState().user,
    headers: store.getState().headers,
  });
});

ReactDOM.render(
  <ReduxProvider store={store}>
    <Routes />
  </ReduxProvider>,
  document.getElementById('root'),
);

ReactDOM.render(
  <ReduxProvider store={store}>
    <Alerts />
  </ReduxProvider>,
  document.getElementById('alert'),
);
