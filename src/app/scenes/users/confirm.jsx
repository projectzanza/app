import React from 'react';
import PropTypes from 'prop-types';

class ConfirmScene extends React.Component {
  constructor(props, context) {
    super(props);
    this.store = context.store;
  }

  componentDidMount() {
  }

  render() {
    return <div>Confirm your email address by clicking the link in your email</div>;
  }
}

ConfirmScene.contextTypes = {
  store: PropTypes.object,
};

export default ConfirmScene;
