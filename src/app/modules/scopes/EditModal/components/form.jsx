import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
} from 'react-bootstrap';
import Scope from '../../model';

class Form extends React.Component {
  constructor(state, context) {
    super(state, context);
    this.state = {
      scope: this.props.scope,
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ scope: nextProps.scope });
  }

  onChange(event) {
    const { scope } = this.state;
    scope[event.target.name] = event.target.value;
    this.setState({ scope });
  }

  render() {
    return (
      <form onSubmit={(e) => { this.props.onSubmit(e, this.state.scope); }}>
        <FormGroup>
          <ControlLabel htmlFor="title">Title</ControlLabel>
          <FormControl
            type="text"
            name="title"
            value={this.state.scope.title}
            onChange={this.onChange}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel htmlFor="description">Description</ControlLabel>
          <FormControl
            type="textarea"
            componentClass="textarea"
            name="description"
            value={this.state.scope.description}
            onChange={this.onChange}
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
  scope: Scope.propTypes.isRequired,
};

export default Form;
