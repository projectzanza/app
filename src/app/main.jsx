import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import routes from './routes';
import rootReducer from './reducers';
import { loadState, saveState } from './localStorage';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

const logger = createLogger();
const persistedState = loadState();
const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunkMiddleware, logger),
);

store.subscribe(() => {
  saveState({
    user: store.getState().user,
    headers: store.getState().headers,
  });
});

ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('root'),
);
