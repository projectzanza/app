import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap';

class FilterInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filterText: '' };

    this.clearFilter = this.clearFilter.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(ev) {
    ev.preventDefault();
    this.props.onSubmit(this.state.filterText);
  }

  clearFilter() {
    this.setState({ filterText: '' });
    this.props.onSubmit('');
  }

  render() {
    return (
      <form onSubmit={ev => this.onSubmit(ev)}>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              name="filterText"
              onChange={this.onChange}
              value={this.state.filterText}
            />
            <InputGroup.Button>
              {
                this.state.filterText &&
                  <Button onClick={this.clearFilter}>
                    <font style={{ color: 'red' }}>X</font>
                  </Button>
              }
              <Button type="submit">Filter</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </form>
    );
  }
}

FilterInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default FilterInput;
