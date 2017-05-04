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
};

export default List;
