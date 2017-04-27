export const Types = {
  HTTP_POST_AUTH: 'HTTP_POST_AUTH',
  HTTP_RESP_USER: 'HTTP_RESP_USER',
  HTTP_RESP_AUTH: 'HTTP_RESP_AUTH',
  HTTP_RESP_SIGNIN: 'HTTP_RESP_SIGNIN',
  HTTP_POST_SIGNIN: 'HTTP_POST_SIGNIN',
  HTTP_RESP_SIGNOUT: 'HTTP_RESP_SIGNOUT',
  HTTP_GET_USERS: 'HTTP_GET_USERS',
  HTTP_RESP_USERS: 'HTTP_RESP_USERS',
};

export function httpPostAuth(user) {
  return {
    type: Types.HTTP_POST_AUTH,
    user,
  };
}

export function httpRespSignIn(json) {
  return {
    type: Types.HTTP_RESP_SIGNIN,
    data: json.data,
  };
}

export function httpRespAuth(json) {
  return {
    type: Types.HTTP_RESP_AUTH,
    data: json.data,
  };
}

export function httpRespUser(json) {
  return {
    type: Types.HTTP_RESP_USER,
    data: json.data,
  };
}

export function httpPostSignIn(user) {
  return {
    type: Types.HTTP_POST_SIGNIN,
    user,
  };
}

export function httpRespSignOut() {
  return {
    type: Types.HTTP_RESP_SIGNOUT,
  };
}

export function httpGetUsers() {
  return {
    type: Types.HTTP_GET_USERS,
  };
}

export function httpRespUsers(json) {
  return {
    type: Types.HTTP_RESP_USERS,
    data: json.data,
  };
}
