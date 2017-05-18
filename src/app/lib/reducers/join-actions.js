import _ from 'lodash';

export const Types = {
  USER_JOBS: 'USER_JOBS',
  USER_COLLABORATING_JOBS: 'USER_COLLABORATING_JOBS',
  JOB_COLLABORATING_USERS: 'JOB_COLLABORATING_USERS',
  USER_MATCHING_JOBS: 'USER_MATCHING_JOBS',
  JOB_MATCHING_USERS: 'JOB_MATCHING_USERS',
  JOB_SCOPES: 'JOB_SCOPES',
  JOB_ESTIMATES: 'JOB_ESTIMATES',
  USER_ESTIMATES: 'USER_ESTIMATES',
};

export const userMatchingJobs = (userId, jobJson, joinAction) => ({
  type: Types.USER_MATCHING_JOBS,
  jobIds: jobJson.data.map(job => job.id),
  userId,
  joinAction,
});

export const jobMatchingUsers = (jobId, userJson, joinAction) => ({
  type: Types.JOB_MATCHING_USERS,
  userIds: userJson.data.map(user => user.id),
  jobId,
  joinAction,
});

export const userJobs = (userId, jobJson, joinAction) => ({
  type: Types.USER_JOBS,
  jobIds: jobJson.data.map(job => job.id),
  userId,
  joinAction,
});

export const userCollaboratingJobs = (userId, jobJson, joinAction) => ({
  type: Types.USER_COLLABORATING_JOBS,
  jobIds: jobJson.data.map(job => job.id),
  userId,
  joinAction,
});

export const jobCollaboratingUsers = (jobId, userJson, joinAction) => {
  const userData = [].concat(userJson.data);
  return {
    type: Types.JOB_COLLABORATING_USERS,
    userIds: userData.map(user => user.id),
    jobId,
    joinAction,
  };
};

export const jobScopes = (jobId, scopeJson) => ({
  type: Types.JOB_SCOPES,
  scopeIds: scopeJson.data.map(job => job.id),
  jobId,
});

export const jobEstimates = (estimateJson) => {
  const estimateData = estimateJson ? _.compact([].concat(estimateJson.data)) : [];

  return {
    type: Types.JOB_ESTIMATES,
    estimateIds: estimateData.map(estimate => estimate.id),
    jobIds: estimateData.map(estimate => estimate.job_id),
    joinAction: 'merge',
  };
};

export const userEstimates = (estimateJson) => {
  const estimateData = estimateJson ? _.compact([].concat(estimateJson.data)) : [];

  return {
    type: Types.USER_ESTIMATES,
    estimateIds: estimateData.map(estimate => estimate.id),
    userIds: estimateData.map(estimate => estimate.user_id),
    joinAction: 'merge',
  };
};
