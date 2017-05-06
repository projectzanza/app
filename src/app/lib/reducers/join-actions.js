export const Types = {
  USER_JOBS: 'USER_JOBS',
  USER_COLLABORATING_JOBS: 'USER_COLLABORATING_JOBS',
  JOB_COLLABORATING_USERS: 'JOB_COLLABORATING_USERS',
  USER_MATCHING_JOBS: 'USER_MATCHING_JOBS',
  JOB_MATCHING_USERS: 'JOB_MATCHING_USERS',
  JOB_SCOPES: 'JOB_SCOPES',
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
