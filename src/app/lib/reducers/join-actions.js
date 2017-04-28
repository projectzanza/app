export const Types = {
  USER_JOBS: 'USER_JOBS',
  USER_MATCHING_JOBS: 'USER_MATCHING_JOBS',
  JOB_MATCHING_USERS: 'JOB_MATCHING_USERS',
  JOB_INVITED_USERS: 'JOB_INVITED_USERS',
  USER_INVITED_JOBS: 'USER_INVITED_JOBS',
};

export const userMatchingJobs = (userId, jobJson) => ({
  type: Types.USER_MATCHING_JOBS,
  jobIds: jobJson.data.map(job => job.id),
  userId,
});

export const jobMatchingUsers = (jobId, userJson) => ({
  type: Types.JOB_MATCHING_USERS,
  userIds: userJson.data.map(user => user.id),
  jobId,
});

export const userJobs = (userId, jobJson) => ({
  type: Types.USER_JOBS,
  jobIds: jobJson.data.map(job => job.id),
  userId,
});

export const jobInvitedUsers = (jobId, userJson) => ({
  type: Types.JOB_INVITED_USERS,
  userIds: userJson.data.map(user => user.id),
  jobId,
});

export const userInvitedJobs = (userId, jobJson) => ({
  type: Types.USER_INVITED_JOBS,
  jobIds: jobJson.data.map(job => job.id),
  userId,
});
