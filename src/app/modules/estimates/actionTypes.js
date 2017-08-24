export const Types = {
  HTTP_POST_ESTIMATE: 'HTTP_POST_ESTIMATE',
  HTTP_DELETE_ESTIMATE: 'HTTP_DELETE_ESTIMATE',
  HTTP_RESP_ESTIMATES: 'HTTP_RESP_ESTIMATES',
  HTTP_RESP_DELETE_ESTIMATE: 'HTTP_RESP_DELETE_ESTIMATE',
};

export function httpPostEstimate(jobId, userId, estimate) {
  return {
    type: Types.HTTP_POST_ESTIMATE,
    jobId,
    userId,
    estimate,
  };
}

export function httpRespEstimates(json) {
  return {
    type: Types.HTTP_RESP_ESTIMATES,
    data: [].concat(json.data),
  };
}

export function httpDeleteEstimate(estimate) {
  return {
    type: Types.HTTP_DELETE_ESTIMATE,
    data: estimate,
  };
}

export function httpRespDeleteEstimate(estimate) {
  return {
    type: Types.HTTP_RESP_DELETE_ESTIMATE,
    data: estimate,
  };
}
