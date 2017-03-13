// import fetch from 'isomorphic-fetch'
import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { configure } from 'redux-auth';
import { AuthGlobals } from 'redux-auth/default-theme';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import routes from './routes';

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware),
);

// ReactDOM.render(
//   <Provider store={store}>
//     <AuthGlobals>
//       <Router history={browserHistory} >
//         {routes()}
//       </Router>
//     </AuthGlobals>
//   </Provider>,
//   document.getElementById('root'),
// );

function renderApp({ cookies, isServer, currentLocation } = {}) {
  return store.dispatch(configure(
    {
      apiUrl: 'http://0.0.0.0:3000',
    },
    {
      isServer,
      cookies,
      currentLocation,
    },
  )).then(({ blank } = {}) => {
    if (blank) {
      // if `blank` is true, this is an OAuth redirect and should not
      // be rendered
      return <noscript />;
    }
    return (
      <Provider store={store}>
        <div>
          <AuthGlobals />
          {routes}
        </div>
      </Provider>
    );
  });
}

const reactRoot = window.document.getElementById('root');
renderApp().then((appComponent) => { ReactDOM.render(appComponent, reactRoot); });
