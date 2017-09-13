import React from 'react';
import PropTypes from 'prop-types';
import { AlertList } from 'react-bs-notifier';
import AlertController from './controller';

export default class Alerts extends React.Component {
  constructor(props, context) {
    super(props);
    this.store = context.store;
    this.state = {
      alerts: [], // props.alerts,
    };
    this.onDismiss = this.onDismiss.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      this.setState({ alerts: AlertController.currentAlerts(this.store) });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onDismiss(alert) {
    AlertController.deleteAlert(this.store, alert);
  }

  render() {
    return (
      <AlertList alerts={this.state.alerts} timeout={5000} onDismiss={this.onDismiss} />
    );
  }
}

Alerts.contextTypes = {
  store: PropTypes.object,
};
