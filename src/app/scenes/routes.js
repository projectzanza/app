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
    show: userId => `/user/${userId}`,
    edit: userId => `/user/${userId}/edit`,
  },
  job: {
    edit: jobId => `/job/${jobId}/edit`,
    show: jobId => `/job/${jobId}`,
    user: (jobId, userId) => `/job/${jobId}/user/${userId}`,
  },
};
