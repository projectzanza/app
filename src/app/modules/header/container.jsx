import React from 'react';
import PropTypes from 'prop-types';
import Header from './components/header';
import './style.scss';

const HeaderContainer = props =>
  <Header
    onClickTitle={props.onClickTitle}
    authButtons={props.authButtons()}
  />;

HeaderContainer.propTypes = {
  authButtons: PropTypes.func.isRequired,
  onClickTitle: PropTypes.func.isRequired,
};

export default HeaderContainer;
