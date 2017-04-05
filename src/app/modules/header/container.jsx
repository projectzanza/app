import React from 'react';
import Header from './components/header';
import './style.scss';

const HeaderContainer = props =>
  <Header
    onClickTitle={props.onClickTitle}
    authButtons={props.authButtons()}
  />;

HeaderContainer.propTypes = {
  authButtons: React.PropTypes.func.isRequired,
  onClickTitle: React.PropTypes.func.isRequired,
};

export default HeaderContainer;
