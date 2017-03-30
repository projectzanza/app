import React from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
} from 'react-bootstrap';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign(
      { title: '', text: '' },
      props.job,
    );

    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.job);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <form onSubmit={e => this.props.onSubmit(e, this.state)}>
        <FormGroup>
          <ControlLabel htmlFor="title">Title</ControlLabel>
          <FormControl
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.onChange}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel htmlFor="text">Description</ControlLabel>
          <FormControl
            type="textarea"
            componentClass="textarea"
            name="text"
            value={this.state.text || ''}
            onChange={this.onChange}
          />
        </FormGroup>
        <FormGroup>
          <Button type="submit" bsStyle="primary">Submit</Button>
        </FormGroup>
      </form>
    );
  }
}

Form.propTypes = {
  job: React.PropTypes.shape({
    title: React.PropTypes.string,
    text: React.PropTypes.string,
  }),
  onSubmit: React.PropTypes.func.isRequired,
};

Form.defaultProps = {
  job: {},
};

export default Form;

