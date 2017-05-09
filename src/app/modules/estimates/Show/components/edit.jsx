import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  ButtonToolbar,
} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props.estimate);

    this.onChange = this.onChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onDateChange(name, value) {
    this.setState({ [name]: value });
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.estimate);
  }

  render(){
    return (
      <form onSubmit={e => this.props.onSubmit(e, this.state)}>
        <FormGroup>
          <ControlLabel htmlFor="days">Days</ControlLabel>
          <FormControl
            type="text"
            name="days"
            value={this.state.days}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel htmlFor="start_at">State Date</ControlLabel>
          <DatePicker
            name="start_at"
            value={this.state.start_at}
            onChange={(value) => this.onDateChange('start_at', value)}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel htmlFor="end_at">State Date</ControlLabel>
          <DatePicker
            name="end_at"
            value={this.state.end_at}
            onChange={(value) => this.onDateChange('end_at', value)}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel htmlFor="days">Per Diem</ControlLabel>
          <FormControl
            type="text"
            name="per_diem"
            value={this.state.per_diem}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel htmlFor="days">Total</ControlLabel>
          <FormControl
            type="text"
            name="total"
            value={this.state.total}
          />
        </FormGroup>
        <ButtonToolbar>
          <Button onClick={() => this.props.onCancel(this.state)}> Cancel </Button>
          <Button type="submit" bsStyle="primary">Submit</Button>
        </ButtonToolbar>
      </form>
    )
  }
}

Edit.propTypes = {
  estimate: PropTypes.shape({
    days: PropTypes.int,
    start_at: PropTypes.string,
    end_at: PropTypes.string,
    per_diem: PropTypes.int,
    total: PropTypes.int,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
