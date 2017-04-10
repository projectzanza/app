import React from 'react';

const JobPropTypes =
  React.PropTypes.shape({
    title: React.PropTypes.string,
    text: React.PropTypes.string,
    tag_list: React.PropTypes.arrayOf(
      React.PropTypes.string,
    ),
    per_diem: React.PropTypes.shape({
      min: React.PropTypes.int,
      max: React.PropTypes.int,
    }),
  });

export default JobPropTypes;