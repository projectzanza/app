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
      canClickComplete={this.props.canClickComplete}
      onClickComplete={this.props.onClickComplete}
      canClickVerify={this.props.canClickVerify}
      onClickVerify={this.props.onClickVerify}
      canClickReject={this.props.canClickReject}
      onClickReject={this.props.onClickReject}
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
  canClickComplete: PropTypes.func.isRequired,
  onClickComplete: PropTypes.func.isRequired,
  canClickVerify: PropTypes.func.isRequired,
  onClickVerify: PropTypes.func.isRequired,
  canClickReject: PropTypes.func.isRequired,
  onClickReject: PropTypes.func.isRequired,
};

export default List;
