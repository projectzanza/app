import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  Checkbox,
} from 'react-bootstrap';
import Job from '../../model';
import CountrySelect from '../../../../components/CountrySelect/container';

class ConsultantFilterForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { filters: Object.assign({ save: true }, props.filters) };
    this.onChange = this.onChange.bind(this);
    this.onCountrySelectChange = this.onCountrySelectChange.bind(this);
  }

  onChange(event) {
    let eventValue;
    if (event.target.type === 'checkbox') {
      eventValue = event.target.checked;
    } else {
      eventValue = event.target.value;
    }
    const { filters } = this.state;
    filters[event.target.name] = eventValue;
    this.setState({ filters });
  }

  onCountrySelectChange(selected) {
    const { filters } = this.state;
    filters.country = selected ? selected.value : '';
    this.setState({ filters });
  }

  render() {
    return (
      <form onSubmit={e => this.props.onSubmit(e, this.state.filters)}>
        <FormGroup>
          <ControlLabel htmlFor="country">Country</ControlLabel>
          <CountrySelect
            type="text"
            name="country"
            value={this.state.filters.country}
            onChange={this.onCountrySelectChange}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel htmlFor="city">City</ControlLabel>
          <FormControl
            type="text"
            name="city"
            value={this.state.filters.city}
            onChange={this.onChange}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel htmlFor="name">Name</ControlLabel>
          <FormControl
            type="text"
            name="name"
            value={this.state.filters.name}
            onChange={this.onChange}
          />
        </FormGroup>
        <FormGroup>
          <Checkbox
            name="onsite"
            checked={this.state.filters.onsite}
            onChange={this.onChange}
          > Required OnSite
          </Checkbox>
        </FormGroup>
        <Button type="submit" bsStyle="primary">Search</Button>
      </form>
    );
  }
}

ConsultantFilterForm.propTypes = {
  filters: Job.consultantFilterPropType.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ConsultantFilterForm;
