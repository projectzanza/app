export const Types = {
  HTTP_POST_JOB: 'HTTP_POST_JOB',
  HTTP_RESP_JOB: 'HTTP_RESP_JOB',
  HTTP_GET_JOB: 'HTTP_GET_JOB',
  HTTP_PUT_JOB: 'HTTP_PUT_JOB',
  HTTP_GET_JOBS: 'HTTP_GET_JOBS',
  HTTP_RESP_JOBS: 'HTTP_RESP_JOBS',
};

export function httpPostJob(job) {
  return {
    type: Types.HTTP_POST_JOB,
    job,
  };
}

export function httpRespJob(json) {
  return {
    type: Types.HTTP_RESP_JOB,
    data: json.data,
  };
}

export function httpGetJob(id) {
  return {
    type: Types.HTTP_GET_JOB,
    id,
  };
}

export function httpPutJob(job) {
  return {
    type: Types.HTTP_PUT_JOB,
    job,
  };
}

export function httpGetJobs() {
  return {
    type: Types.HTTP_GET_JOBS,
  };
}

export function httpRespJobs(json) {
  return {
    type: Types.HTTP_RESP_JOBS,
    data: json.data,
  };
}
