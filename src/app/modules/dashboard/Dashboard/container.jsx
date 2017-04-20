import React from 'react';

const DashboardContainer = props => (
  <div>
    { props.children }
  </div>
);

DashboardContainer.propTypes = {
  children: React.PropTypes.node,
};

DashboardContainer.defaultProps = {
  children: null,
};

export default DashboardContainer;
