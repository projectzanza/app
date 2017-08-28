import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import ScopeView from './scope';
import Scope from '../../model';

class List extends React.Component {

  listItems() {
    return this.props.scopes.map(scope => <ScopeView
      key={scope.id}
      scope={scope}
      onClickComplete={this.props.onClickComplete}
      onClickVerify={this.props.onClickVerify}
      onClickReject={this.props.onClickReject}
      onClickEdit={this.props.onClickEdit}
      onClickDelete={this.props.onClickDelete}
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
  scopes: PropTypes.arrayOf(
    Scope.propTypes,
  ).isRequired,
  onClickComplete: PropTypes.func.isRequired,
  onClickVerify: PropTypes.func.isRequired,
  onClickReject: PropTypes.func.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};

export default List;
