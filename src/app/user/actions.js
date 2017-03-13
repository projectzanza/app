import fetch from 'isomorphic-fetch';

export const HTTP_POST_AUTH = 'HTTP_POST_AUTH';
export const HTTP_RESP_AUTH = 'HTTP_RESP_AUTH';

function httpPostAuth(user) {
  return {
    type: HTTP_POST_AUTH,
    user,
  };
}

function httpRespAuth(json) {
  return {
    type: HTTP_RESP_AUTH,
    result: json,
    receivedAt: Date.now(),
  };
}

export function createUser(user) {
  return (dispatch) => {
    dispatch(httpPostAuth(user));

    return fetch('http://0.0.0.0:3000/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(json => dispatch(httpRespAuth(json)),
      );
  };
}

export function loginUser() {
  return () => {

  };
}
