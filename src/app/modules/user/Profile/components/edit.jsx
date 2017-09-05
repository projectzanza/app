import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
} from 'react-bootstrap';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import 'react-bootstrap-slider/src/css/bootstrap-slider.min.css';
import TagInput from '../../../../components/TagInput/container';
import User from '../../model';

class Edit extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = Object.assign({}, props.user);
    this.onChange = this.onChange.bind(this);
    this.onTagChange = this.onTagChange.bind(this);
    this.onSliderChange = this.onSliderChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.user);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onTagChange(tags) {
    this.setState({ tag_list: tags });
  }

  onSliderChange(event) {
    this.setState({
      per_diem: {
        min: event.target.value[0],
        max: event.target.value[1],
      },
    });
  }

  render() {
    return (
      <form onSubmit={e => this.props.onSubmit(e, this.state)}>
        <FormGroup>
          <ControlLabel htmlFor="name">Name</ControlLabel>
          <FormControl
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel htmlFor="headline">Headline</ControlLabel>
          <FormControl
            type="text"
            name="headline"
            value={this.state.headline}
            onChange={this.onChange}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel htmlFor="summary">Summary</ControlLabel>
          <FormControl
            type="textarea"
            name="summary"
            componentClass="textarea"
            value={this.state.summary}
            onChange={this.onChange}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel htmlFor="slider">Price Per Day</ControlLabel><br />
          <ReactBootstrapSlider
            value={[this.state.per_diem.min, this.state.per_diem.max]}
            max={1000}
            min={0}
            step={50}
            slideStop={this.onSliderChange}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel htmlFor="tag_list">Tags</ControlLabel>
          <TagInput
            mode="edit"
            value={this.state.tag_list}
            onChange={this.onTagChange}
          />
        </FormGroup>
        <FormGroup>
          <Button onClick={() => this.props.onCancel(this.state)}>Cancel</Button>
          <Button type="submit" bsStyle="primary">Submit</Button>
        </FormGroup>
      </form>
    );
  }
}

Edit.propTypes = {
  user: User.propTypes.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Edit;
