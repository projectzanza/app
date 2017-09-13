export const Types = {
  CREATE_ALERT: 'CREATE_ALERT',
  DELETE_ALERT: 'DELETE_ALERT',
};

export const createAlert = alert => ({
  type: Types.CREATE_ALERT,
  alert: {
    id: Math.floor(Math.random() * 1000),
    type: alert.type,
    message: alert.message,
  },
});

export const deleteAlert = alertId => ({
  type: Types.DELETE_ALERT,
  id: alertId,
});
