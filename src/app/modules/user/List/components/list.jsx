import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import UserView from './user';
import User from '../../model';

class List extends React.Component {
  listItems() {
    return this.props.users.map(user => (<UserView
      key={user.id}
      user={user}
      jobId={this.props.jobId}
      onClick={this.props.onClickUser}
      onClickInvite={this.props.onClickInviteUserFunc(user)}
      onClickAward={this.props.onClickAwardUserFunc(user)}
      onClickReject={this.props.onClickRejectUserFunc(user)}
      onClickCertify={this.props.onClickCertifyUserFunc(user)}
      onClickDecertify={this.props.onClickDecertifyUserFunc(user)}
    />));
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
  users: PropTypes.arrayOf(User.propTypes).isRequired,
  jobId: PropTypes.string,
  onClickInviteUserFunc: PropTypes.func,
  onClickAwardUserFunc: PropTypes.func,
  onClickRejectUserFunc: PropTypes.func,
  onClickCertifyUserFunc: PropTypes.func,
  onClickDecertifyUserFunc: PropTypes.func,
  onClickUser: PropTypes.func.isRequired,
};

List.defaultProps = {
  jobId: undefined,
  onClickInviteUserFunc: undefined,
  onClickAwardUserFunc: undefined,
  onClickRejectUserFunc: undefined,
  onClickCertifyUserFunc: undefined,
  onClickDecertifyUserFunc: undefined,
};

List.contextTypes = {
  store: PropTypes.object,
};

export default List;
