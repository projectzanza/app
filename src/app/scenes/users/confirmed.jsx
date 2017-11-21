import React from 'react';
import PropTypes from 'prop-types';

class ConfirmedScene extends React.Component {
  constructor(props, context) {
    super(props);
    this.store = context.store;
  }


  render() {
    return (
      <div>
        <h2>Confirmed!</h2>
        <h4> Login to continue </h4>
      </div>
    );
  }
}

ConfirmedScene.contextTypes = {
  store: PropTypes.object,
};

export default ConfirmedScene;
