import React from 'react';

const JobPropTypes =
  React.PropTypes.shape({
    title: React.PropTypes.string,
    text: React.PropTypes.string,
    tag_list: React.PropTypes.arrayOf(
      React.PropTypes.string,
    ),
  });

export default JobPropTypes;
