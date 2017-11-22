import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  Checkbox,
  ButtonToolbar,
} from 'react-bootstrap';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import DatePicker from 'react-datepicker';
import TagInput from '../../../../components/TagInput/container';
import Job from '../../model';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, Job.defaults, props.job);

    this.onChange = this.onChange.bind(this);
    this.onTagChange = this.onTagChange.bind(this);
    this.onSliderChange = this.onSliderChange.bind(this);
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onEndDateChange = this.onEndDateChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.job);
  }

  onChange(event) {
    let eventValue;
    if (event.target.type === 'checkbox') {
      eventValue = event.target.checked;
    } else {
      eventValue = event.target.value;
    }
    this.setState({ [event.target.name]: eventValue });
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

  onStartDateChange(value) {
    this.setState({ proposed_start_at: value });
  }

  onEndDateChange(value) {
    this.setState({ proposed_end_at: value });
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
          <ControlLabel htmlFor="proposed_start_at">Proposed State Date</ControlLabel>
          <DatePicker
            name="proposed_start_at"
            selected={this.state.proposed_start_at}
            onChange={this.onStartDateChange}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel htmlFor="proposed_end_at">Proposed End Date</ControlLabel>
          <DatePicker
            name="proposed_end_at"
            selected={this.state.proposed_end_at}
            onChange={this.onEndDateChange}
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
          <Checkbox
            name="allow_contact"
            checked={this.state.allow_contact}
            onChange={this.onChange}
          > Contact Me
          </Checkbox>
        </FormGroup>
        <ButtonToolbar>
          <Button onClick={() => this.props.onCancel(this.state)}> Cancel </Button>
          <Button type="submit" bsStyle="primary">Submit</Button>
        </ButtonToolbar>
      </form>
    );
  }
}

Edit.propTypes = {
  job: Job.propTypes.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Edit;

