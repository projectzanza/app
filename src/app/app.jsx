import React from 'react';
import HeaderController from './modules/header/controller';

export default function App(props) {
  return (
    <div>
      {HeaderController.scene()}
      <div className="content">
        {props.children}
      </div>
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};
App.getDefaultProps = {
  children: null,
};
