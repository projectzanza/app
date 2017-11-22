import * as actionTypes from './actionTypes';

const Type = {
  error: 'danger',
  success: 'success',
  info: 'info',
};

export default class AlertController {
  static get Type() {
    return Type;
  }

  static currentAlerts(store) {
    return Object.values(store.getState().alerts.entities);
  }

  static deleteAlert(store, alert) {
    return store.dispatch(actionTypes.deleteAlert(alert.id));
  }


  static dispatchAlert(dispatch, type, message) {
    const store = { dispatch };
    this.alert(store, type, message);
  }

  static alert(store, type, message) {
    return store.dispatch(actionTypes.createAlert({
      type: AlertController.Type[type],
      message,
    }));
  }
}
