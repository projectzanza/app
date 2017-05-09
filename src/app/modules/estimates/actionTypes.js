export const Types = {
  HTTP_POST_ESTIMATE: 'HTTP_POST_ESTIMATE',
  HTTP_RESP_ESTIMATE: 'HTTP_RESP_ESTIMATE',
};

export function httpPostEstimate(jobId, userId, estimate) {
  return {
    type: Types.HTTP_POST_ESTIMATE,
    jobId,
    userId,
    estimate,
  }
}

export function httpRespEstimate(json) {
  return {
    type: Types.HTTP_RESP_ESTIMATE,
    data: json.data,
  }
}

export function httpRespJobsContainingEstimates(json) {
  const data = [].concat(json.data);
  estimates = data.map(job => _.get(job, 'meta.current_user.estimate'))
  return {
    type: Types.HTTP_RESP_ESTIMATE,

  }
}
