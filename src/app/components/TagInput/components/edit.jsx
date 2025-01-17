import React from 'react';
import PropTypes from 'prop-types';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import TagListPropTypes from '../propTypes';

const Edit = props => (
  <TagsInput
    value={props.value}
    onChange={props.onChange}
  />
);

Edit.propTypes = {
  value: TagListPropTypes.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Edit;
