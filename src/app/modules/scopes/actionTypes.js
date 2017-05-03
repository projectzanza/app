export const Types = {
  HTTP_POST_SCOPE: 'HTTP_POST_SCOPE',
  HTTP_RESP_SCOPES: 'HTTP_RESP_SCOPES',
  HTTP_GET_SCOPES: 'HTTP_GET_SCOPES',
};

export function httpPostScope(jobId, scope) {
  return {
    type: Types.HTTP_POST_SCOPE,
    jobId,
    scope,
  };
}

export function httpRespScopes(json) {
  if (json.data) {
    return {
      type: Types.HTTP_RESP_SCOPES,
      data: json.data,
    };
  }
  return {};
}

export function httpGetScopes(jobId) {
  return {
    type: Types.HTTP_GET_SCOPES,
    jobId,
  };
}
