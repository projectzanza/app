import fetch from '../../lib/fetch/fetch';

export function postLogin() {
  return (dispatch, getState) => fetch(
      '/rocket_chat/login',
    {
      method: 'POST',
      headers: getState().headers,
    }, dispatch)
    .then(response => response.json())
    .then(json => json.data.loginToken);
}

export function anotherAction() {

}
