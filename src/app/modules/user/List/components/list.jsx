import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import UserView from './user';
import User from '../../model';

class List extends React.Component {

  listItems() {
    return this.props.users.map(user => <UserView
      key={user.id}
      user={user}
      onClick={this.props.onClickUser}
      onClickInvite={this.props.onClickInviteUser}
      onClickAward={this.props.onClickAwardUser}
      onClickReject={this.props.onClickRejectUser}
    />);
  }

  render() {
    return (
      <Table striped bordered condensed hover>
        <tbody>
          {this.listItems()}
        </tbody>
      </Table>
    );
  }
}

List.propTypes = {
  users: PropTypes.arrayOf(
    User.propTypes,
  ).isRequired,
  onClickInviteUser: PropTypes.func,
  onClickAwardUser: PropTypes.func,
  onClickRejectUser: PropTypes.func,
  onClickUser: PropTypes.func.isRequired,
};

List.defaultProps = {
  onClickInviteUser: undefined,
  onClickAwardUser: undefined,
  onClickRejectUser: undefined,
};

export default List;
