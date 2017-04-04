import React from 'react';
import Edit from './components/edit';
import View from './components/view';
import TagListPropTypes from './propTypes';

const TagInput = (props) => {
  if (props.mode === 'edit') {
    return (
      <Edit
        value={props.value}
        onChange={props.onChange}
      />
    );
  }
  return <View value={props.value} />;
};

TagInput.propTypes = {
  value: TagListPropTypes.isRequired,
  onChange: React.PropTypes.func,
  mode: React.PropTypes.string,
};

TagInput.defaultProps = {
  mode: 'edit',
  onChange: () => {},
};

export default TagInput;
