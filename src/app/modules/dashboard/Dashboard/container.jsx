import React from 'react';
import PropTypes from 'prop-types';

const DashboardContainer = props => (
  <div>
    { props.children }
  </div>
);

DashboardContainer.propTypes = {
  children: PropTypes.node,
};

DashboardContainer.defaultProps = {
  children: null,
};

export default DashboardContainer;
