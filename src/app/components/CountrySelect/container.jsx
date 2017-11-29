import React from 'react';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';
import countries from './data';

const CountrySelect = props => (
  <ReactSelect
    {...props}
    options={countries}
  />
  );

export default CountrySelect;
