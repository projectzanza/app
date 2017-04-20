import React from 'react';
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
  params: React.PropTypes.shape({
    id: React.PropTypes.string,
    mode: React.PropTypes.string,
  }).isRequired,
};

UserShowScene.contextTypes = {
  store: React.PropTypes.object,
};

export default UserShowScene;
