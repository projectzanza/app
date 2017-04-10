import React from 'react';

const UserPropTypes =
  React.PropTypes.shape({
    name: React.PropTypes.string,
    bio: React.PropTypes.string,
    tag_list: React.PropTypes.arrayOf(
      React.PropTypes.string,
    ),
    per_diem: React.PropTypes.shape({
      min: React.PropTypes.int,
      max: React.PropTypes.int,
    }),
  });

export default UserPropTypes;
