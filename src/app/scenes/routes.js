export default {
  app: {
    home: '/',
    signin: '/signin',
    signup: '/signup',
  },
  dashboard: {
    show: '/dashboard',
  },
  user: {
    profile: userId => `/user/${userId}`,
  },
  job: {
    edit: jobId => `/job/${jobId}/edit`,
    show: jobId => `/job/${jobId}`,
    user: (jobId, userId) => `/job/${jobId}/user/${userId}`,
  },
};
