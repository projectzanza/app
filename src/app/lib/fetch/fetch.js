import originalFetch from 'isomorphic-fetch';
import url from 'url';
import { httpHeaderResponse } from './actions';
import Config from '../../config/app';

function fetch(path, params, dispatch) {
  const defaultParams = {
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  };

  // set default headers and add in any extra headers supplied
  Object.assign(defaultParams.headers, params.headers);

  // set up the fetch url to include the
  // server name, path and any params passed
  const urlQuery = url.format({ query: params.query });
  const fetchUrl = `${Config.apiUrl}${path}${urlQuery}`;

  // remove any parameters that are used else where
  // and pass the rest of the params to fetch, along with default parameters
  let fetchParams = Object.assign({}, params);
  delete fetchParams.headers;
  delete fetchParams.query;

  fetchParams = Object.assign(
    defaultParams,
    fetchParams,
  );

  // time to fetch!
  // return the promise, so it can be used by the caller
  return originalFetch(fetchUrl, fetchParams)
    .then((response) => {
      dispatch(httpHeaderResponse(response));
      return response;
    });
}

export default fetch;
