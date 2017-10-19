import React from 'react';
import PropTypes from 'prop-types';

class ConfirmedScene extends React.Component {
  constructor(props, context) {
    super(props);
    this.store = context.store;
  }

  componentDidMount() {
  }

  render() {
    return <div>Confirmed!</div>;
  }
}

ConfirmedScene.contextTypes = {
  store: PropTypes.object,
};

export default ConfirmedScene;
