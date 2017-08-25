export const noEstimate = {
  data: null,
};

export const estimate = {
  data: {
    id: 1,
    user_id: 100,
    job_id: 1000,
    days: 2,
  },
};

export const deleteEstimate = {
  success: 'true'
};

export const acceptedEstimate = {
  data: {
    id: 1,
    user_id: 100,
    job_id: 1000,
    days: 2,
    state: 'accepted',
  },
};

export const rejectedEstimate = {
  data: {
    id: 1,
    user_id: 100,
    job_id: 1000,
    days: 2,
    state: 'rejected',
  },
};
