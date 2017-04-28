import React from 'react';
import List from './components/list';
import User from '../model';

class ListContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      users: this.props.users,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ users: nextProps.users });
  }

  render() {
    return (
      <List
        users={this.state.users}
        onClickInviteUser={this.props.onClickInviteUser}
        onClickUser={this.props.onClickUser}
      />
    );
  }
}

ListContainer.contextTypes = {
  store: React.PropTypes.object,
};

ListContainer.propTypes = {
  users: React.PropTypes.arrayOf(
    User.propTypes,
  ),
  onClickUser: React.PropTypes.func.isRequired,
  onClickInviteUser: React.PropTypes.func,
};

ListContainer.defaultProps = {
  onClickInviteUser: undefined,
  match: undefined,
  invited: undefined,
  users: [],
};

export default ListContainer;
