const Actions = {
  HTTP_HEADER_RESP: 'HTTP_HEADER_RESP',
};

function httpHeaderResponse(response) {
  let headers = {};
  if (response.headers.get('uid')) {
    headers = {
      'access-token': response.headers.get('access-token'),
      uid: response.headers.get('uid'),
      client: response.headers.get('client'),
      expiry: response.headers.get('expiry'),
      'token-type': response.headers.get('token-type'),
    };
  }

  return {
    type: Actions.HTTP_HEADER_RESP,
    headers,
  };
}

export { Actions, httpHeaderResponse };
