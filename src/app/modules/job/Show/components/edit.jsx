import React from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
} from 'react-bootstrap';
import TagInput from '../../../../components/TagInput/container';
import JobPropTypes from '../../propTypes';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props.job);

    this.onChange = this.onChange.bind(this);
    this.onTagChange = this.onTagChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.job);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onTagChange(tags) {
    this.setState({ tag_list: tags });
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
            value={this.state.text}
            onChange={this.onChange}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel htmlFor="tags">Tags</ControlLabel>
          <TagInput
            mode="edit"
            value={this.state.tag_list}
            onChange={this.onTagChange}
          />
        </FormGroup>
        <FormGroup>
          <Button type="submit" bsStyle="primary">Submit</Button>
        </FormGroup>
      </form>
    );
  }
}

Edit.propTypes = {
  job: JobPropTypes.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
};

export default Edit;

