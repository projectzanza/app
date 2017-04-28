import React from 'react';
import UserView from './user';
import User from '../../model';

class List extends React.Component {

  listItems() {
    return this.props.users.map(user => <UserView
      key={user.id}
      user={user}
      onClick={this.props.onClickUser}
      onClickInvite={this.props.onClickInviteUser}
    />);
  }

  render() {
    return (
      <div>
        {this.listItems()}
      </div>
    );
  }
}

List.propTypes = {
  users: React.PropTypes.arrayOf(
    User.propTypes,
  ).isRequired,
  onClickInviteUser: React.PropTypes.func,
  onClickUser: React.PropTypes.func.isRequired,
};

List.defaultProps = {
  onClickInviteUser: undefined,
};

export default List;
