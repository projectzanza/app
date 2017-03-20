import originalFetch from 'isomorphic-fetch';
import { httpHeaderResponse } from './actions';
import Config from '../../config/app';

function fetch(url, params, dispatch) {
  const defaultParams = {
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  };

  Object.assign(defaultParams.headers, params.headers);

  let fetchParams = Object.assign({}, params);
  delete fetchParams.headers;

  fetchParams = Object.assign(
    defaultParams,
    fetchParams,
  );

  return originalFetch(`${Config.apiUrl}${url}`, fetchParams)
    .then((response) => {
      dispatch(httpHeaderResponse(response));
      return response;
    });
}

export default fetch;
