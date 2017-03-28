import React from 'react';
import Header from './components/header';
import './style.scss';

const HeaderContainer = props =>
  <Header
    authButtons={props.authButtons()}
  />;

HeaderContainer.propTypes = {
  authButtons: React.PropTypes.func.isRequired,
};

export default HeaderContainer;
