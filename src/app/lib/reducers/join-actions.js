export const Types = {
  USER_JOBS: 'USER_JOBS',
  USER_COLLABORATING_JOBS: 'USER_COLLABORATING_JOBS',
  JOB_COLLABORATING_USERS: 'JOB_COLLABORATING_USERS',
  USER_MATCHING_JOBS: 'USER_MATCHING_JOBS',
  JOB_MATCHING_USERS: 'JOB_MATCHING_USERS',
  JOB_SCOPES: 'JOB_SCOPES',
  JOB_ESTIMATES: 'JOB_ESTIMATES',
  USER_ESTIMATES: 'USER_ESTIMATES',
  JOB_ESTIMATES_DELETE: 'JOB_ESTIMATES_DELETE',
  USER_ESTIMATES_DELETE: 'USER_ESTIMATES_DELETE',
  JOB_SCOPES_DELETE: 'JOB_SCOPES_DELETE',
  USER_POSITIONS: 'USER_POSITIONS',
  USER_POSITION_DELETE: 'USER_POSITION_DELETE',
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

export const jobScopes = (jobId, scopeJson) => {
  const data = [].concat(scopeJson.data);
  return {
    type: Types.JOB_SCOPES,
    scopeIds: data.map(job => job.id),
    jobId,
  };
};

export const jobScopesDelete = (jobId, scopeId) => ({
  type: Types.JOB_SCOPES_DELETE,
  scopeId,
  jobId,
});

export const jobEstimates = estimateJson => ({
  type: Types.JOB_ESTIMATES,
  data: estimateJson.data,
  joinAction: 'merge',
});

export const userEstimates = estimateJson => ({
  type: Types.USER_ESTIMATES,
  data: estimateJson.data,
  joinAction: 'merge',
});

export const jobEstimateDelete = estimateJson => ({
  type: Types.JOB_ESTIMATES_DELETE,
  data: estimateJson,
  joinAction: 'purge',
});

export const userEstimateDelete = estimateJson => ({
  type: Types.USER_ESTIMATES_DELETE,
  data: estimateJson,
  joinAction: 'purge',
});

export const userPositions = (userId, positionJson) => {
  const data = [].concat(positionJson.data);

  return {
    type: Types.USER_POSITIONS,
    userId,
    positionIds: data.map(position => position.id),
    joinAction: 'merge',
  };
};

export const userPositionDelete = (userId, positionId) => ({
  type: Types.USER_POSITION_DELETE,
  positionId,
  userId,
  joinAction: 'purge',
});

