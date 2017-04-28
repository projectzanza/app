import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  FormControl,
  InputGroup,
  Button,
} from 'react-bootstrap';

class QuickCreateJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <form onSubmit={(e) => { this.props.onSubmit(e, this.state); }}>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              name="title"
              value={this.state.title}
              placeholder="New Job Title"
              onChange={this.onChange}
            />

            <InputGroup.Button>
              <Button type="submit" bsStyle="primary"> Create New Job </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </form>
    );
  }
}

QuickCreateJob.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default QuickCreateJob;
