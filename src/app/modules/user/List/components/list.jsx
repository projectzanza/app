import React from 'react';
import User from './user';
import UserPropTypes from '../../propTypes';

class List extends React.Component {

  listItems() {
    return this.props.users.map(user => <User
      key={user.id}
      user={user}
      onClick={this.props.onClickUser}
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
    UserPropTypes,
  ).isRequired,
  onClickUser: React.PropTypes.func.isRequired,
};

export default List;
