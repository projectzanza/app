import React from 'react';
import PropTypes from 'prop-types';
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
  store: PropTypes.object,
};

ListContainer.propTypes = {
  users: PropTypes.arrayOf(
    User.propTypes,
  ),
  onClickUser: PropTypes.func.isRequired,
  onClickInviteUser: PropTypes.func,
};

ListContainer.defaultProps = {
  onClickInviteUser: undefined,
  match: undefined,
  invited: undefined,
  users: [],
};

export default ListContainer;
