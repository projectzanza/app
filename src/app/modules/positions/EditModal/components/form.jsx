import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import Position from '../../model';

class Form extends React.Component {
  constructor(state, context) {
    super(state, context);
    this.state = {
      position: this.props.position,
    };

    this.onChange = this.onChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ position: nextProps.position });
  }

  onChange(event) {
    const { position } = this.state;
    position[event.target.name] = event.target.value;
    this.setState({ position });
  }

  onDateChange(name, value) {
    const { position } = this.state;
    position[name] = value;
    this.setState({ position });
  }

  render() {
    return (
      <form onSubmit={(e) => { this.props.onSubmit(e, this.state.position); }}>
        <FormGroup>
          <ControlLabel htmlFor="title">Title</ControlLabel>
          <FormControl
            type="text"
            name="title"
            value={this.state.position.title}
            onChange={this.onChange}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel htmlFor="title">Company</ControlLabel>
          <FormControl
            type="text"
            name="company"
            value={this.state.position.company}
            onChange={this.onChange}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel htmlFor="description">Summary</ControlLabel>
          <FormControl
            type="textarea"
            componentClass="textarea"
            name="summary"
            value={this.state.position.summary}
            onChange={this.onChange}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel htmlFor="start_at">State Date</ControlLabel>
          <DatePicker
            name="start_at"
            value={this.state.position.start_at}
            onChange={date => this.onDateChange('start_at', date)}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel htmlFor="end_at">End Date</ControlLabel>
          <DatePicker
            name="end_at"
            value={this.state.position.end_at}
            onChange={date => this.onDateChange('end_at', date)}
          />
        </FormGroup>

        <FormGroup>
          <Button onClick={this.props.onCancel}>Cancel</Button>
          <Button type="submit" bsStyle="primary">Submit</Button>
        </FormGroup>
      </form>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  position: Position.propTypes.isRequired,
};

export default Form;
