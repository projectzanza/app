import React from 'react';

export default function App(props) {
  return (
    <div>
      {props.children}
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};
App.getDefaultProps = {
  children: null,
};
