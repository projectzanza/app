import React from 'react';
import PropTypes from 'prop-types';

class SessionContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      if (!this.props.validSession()) {
        this.props.onAuthError();
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    return this.props.children;
  }
}

SessionContainer.contextTypes = {
  store: PropTypes.object,
};

SessionContainer.propTypes = {
  onAuthError: PropTypes.func.isRequired,
  validSession: PropTypes.func.isRequired,
  children: PropTypes.node,
};
SessionContainer.getDefaultProps = {
  children: null,
};

export default SessionContainer;
