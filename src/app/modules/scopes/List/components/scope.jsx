import React from 'react';
import Scope from '../../model';

const ScopeView = props => (
  <tr>
    <td>
      { props.scope.title }
    </td>
    <td>
      { props.scope.description }
    </td>
  </tr>

);

ScopeView.propTypes = {
  scope: Scope.propTypes.isRequired,
};

export default ScopeView;
