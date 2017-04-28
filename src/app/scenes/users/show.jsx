import React from 'react';
import PropTypes from 'prop-types';
import ShowUser from '../../modules/user/Profile/container';

class UserShowScene extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {};
  }

  render() {
    return (
      <ShowUser
        id={this.props.params.id}
        mode={this.props.params.mode}
      />
    );
  }
}

UserShowScene.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
    mode: PropTypes.string,
  }).isRequired,
};

UserShowScene.contextTypes = {
  store: PropTypes.object,
};

export default UserShowScene;
