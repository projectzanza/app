import React from 'react';
import { IntlProvider } from 'react-intl';
import HeaderController from './modules/header/controller';


export default function App(props) {
  return (
    <IntlProvider locale="en-GB">
      <div>
        {HeaderController.scene()}
        <div className="content">
          {props.children}
        </div>
      </div>
    </IntlProvider>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};
App.getDefaultProps = {
  children: null,
};
