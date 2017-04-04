import React from 'react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import TagListPropTypes from '../propTypes';

const TagLayout = tagComponents => (
  <span>
    {tagComponents}
  </span>
);

const View = props => (
  <TagsInput
    value={props.value}
    renderLayout={TagLayout}
    onChange={() => {}}
    disabled
  />
);

View.propTypes = {
  value: TagListPropTypes,
};

export default View;
