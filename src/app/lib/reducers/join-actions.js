export const Types = {
  SKIP: 'SKIP',
  USER_JOBS: 'USER_JOBS',
  USER_MATCHING_JOBS: 'USER_MATCHING_JOBS',
  JOB_MATCHING_USERS: 'JOB_MATCHING_USERS',
  JOB_INVITED_USERS: 'JOB_INVITED_USERS',
  USER_INVITED_JOBS: 'USER_INVITED_JOBS',
  USER_INTERESTED_IN_JOBS: 'USER_INTERESTED_IN_JOBS',
  JOB_INTERESTED_USERS: 'JOB_INTERESTED_USERS',
  JOB_AWARD_USER: 'JOB_AWARD_USER',
  USER_AWARD_JOBS: 'USER_AWARD_JOBS',
  USER_ACCEPTED_JOBS: 'USER_ACCEPTED_JOBS',
  JOB_SCOPES: 'JOB_SCOPES',
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

export const userInterestedInJobs = (userId, jobJson) => ({
  type: Types.USER_INTERESTED_IN_JOBS,
  jobIds: jobJson.data.map(job => job.id),
  userId,
});

export const jobInterestedUsers = (jobId, userJson) => ({
  type: Types.JOB_INTERESTED_USERS,
  userIds: userJson.data.map(job => job.id),
  jobId,
});

export const jobAwardUser = (jobId, userJson) => {
  if (userJson.data) {
    return {
      type: Types.JOB_AWARD_USER,
      userId: userJson.data.id,
      jobId,
    };
  }
  return { type: Types.SKIP };
};

export const userAwardJobs = (userId, jobJson) => ({
  type: Types.USER_AWARD_JOBS,
  jobIds: jobJson.data.map(job => job.id),
  userId,
});

export const userAcceptedJobs = (userId, jobJson) => ({
  type: Types.USER_ACCEPTED_JOBS,
  jobIds: jobJson.data.map(job => job.id),
  userId,
});

export const jobScopes = (jobId, scopeJson) => ({
  type: Types.JOB_SCOPES,
  scopeIds: scopeJson.data.map(job => job.id),
  jobId,
});
