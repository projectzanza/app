import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  ButtonToolbar,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { estimate: props.estimate };

    this.onChange = this.onChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ estimate: nextProps.estimate });
  }

  onChange(event) {
    const { estimate } = this.state;
    estimate[event.target.name] = event.target.value;
    this.setState({ estimate });
  }

  onDateChange(name, value) {
    const { estimate } = this.state;
    estimate[name] = value;
    this.setState({ estimate });
  }

  render() {
    return (
      <form onSubmit={e => this.props.onSubmit(e, this.state.estimate)}>
        <FormGroup>
          <ControlLabel htmlFor="days">Days</ControlLabel>
          <FormControl
            type="text"
            name="days"
            value={this.state.estimate.days}
            onChange={this.onChange}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel htmlFor="start_at">Start Date</ControlLabel>
          <DatePicker
            name="start_at"
            selected={this.state.estimate.start_at}
            onChange={value => this.onDateChange('start_at', value)}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel htmlFor="end_at">End Date</ControlLabel>
          <DatePicker
            name="end_at"
            selected={this.state.estimate.end_at}
            onChange={value => this.onDateChange('end_at', value)}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel htmlFor="per_diem">Per Diem</ControlLabel>
          <FormControl
            type="text"
            name="per_diem"
            value={this.state.estimate.per_diem}
            onChange={this.onChange}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel htmlFor="total">Total</ControlLabel>
          <FormControl
            type="text"
            name="total"
            value={this.state.estimate.total}
            onChange={this.onChange}
          />
        </FormGroup>
        <ButtonToolbar>
          <Button onClick={() => this.props.onClickCancel(this.state)}> Cancel </Button>
          <Button type="submit" bsStyle="primary">Submit</Button>
        </ButtonToolbar>
      </form>
    );
  }
}

Edit.propTypes = {
  estimate: PropTypes.shape({
    days: PropTypes.int,
    start_at: PropTypes.string,
    end_at: PropTypes.string,
    per_diem: PropTypes.int,
    total: PropTypes.int,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClickCancel: PropTypes.func.isRequired,
};

export default Edit;
