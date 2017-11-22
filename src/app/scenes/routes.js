export default {
  app: {
    home: '/',
    signin: '/signin',
    signup: '/signup',
    confirm: '/confirm',
    confirmed: '/confirmed',
  },
  dashboard: {
    show: '/dashboard',
    admin: '/admin',
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
