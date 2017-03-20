const Actions = {
  HTTP_HEADER_RESP: 'HTTP_HEADER_RESP',
};

function httpHeaderResponse(response) {
  let headers = {};
  if (response.headers) {
    headers = {
      access_token: response.headers.get('access_token'),
      uid: response.headers.get('uid'),
    };
  }

  return {
    type: Actions.HTTP_HEADER_RESP,
    headers,
  };
}

export { Actions, httpHeaderResponse };
