import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  Checkbox,
} from 'react-bootstrap';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import Dropzone from 'react-dropzone';
import 'react-bootstrap-slider/src/css/bootstrap-slider.min.css';
import TagInput from '../../../../components/TagInput/container';
import CountrySelect from '../../../../components/CountrySelect/container';
import User from '../../model';

class Edit extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { user: props.user };
    this.onChange = this.onChange.bind(this);
    this.onTagChange = this.onTagChange.bind(this);
    this.onSliderChange = this.onSliderChange.bind(this);
    this.onCountrySelectChange = this.onCountrySelectChange.bind(this);
    this.avatarImg = this.avatarImg.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ user: nextProps.user });
  }

  onChange(event) {
    const { user } = this.state;
    let eventValue;

    if (event.target.type === 'checkbox') {
      eventValue = event.target.checked;
    } else {
      eventValue = event.target.value;
    }
    user[event.target.name] = eventValue;
    this.setState({ user });
  }

  onTagChange(tags) {
    const { user } = this.state;
    user.tag_list = tags;
    this.setState({ user });
  }

  onSliderChange(event) {
    const { user } = this.state;
    user.per_diem = {
      min: event.target.value[0],
      max: event.target.value[1],
    };
    this.setState({ user });
  }

  onCountrySelectChange(selected) {
    const { user } = this.state;
    user.country = selected ? selected.value : '';
    this.setState({ user });
  }

  avatarImg() {
    const avatarImgSrc = this.props.avatarPreview ?
      this.props.avatarPreview.preview : this.state.user.avatar_url;

    if (avatarImgSrc) {
      return <img src={avatarImgSrc} className="fill-parent" alt="avatar" />;
    }
    return null;
  }

  render() {
    return (
      <div>
        <Dropzone
          onDropAccepted={this.props.onDropAccepted}
          multiple={false}
        >
          {this.avatarImg()}
        </Dropzone>

        <form onSubmit={e => this.props.onSubmit(e, this.state.user)}>
          <FormGroup>
            <ControlLabel htmlFor="name">Name</ControlLabel>
            <FormControl
              type="text"
              name="name"
              value={this.state.user.name}
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel htmlFor="country">Country</ControlLabel>
            <CountrySelect
              type="text"
              name="country"
              value={this.state.user.country}
              onChange={this.onCountrySelectChange}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel htmlFor="city">City</ControlLabel>
            <FormControl
              type="text"
              name="city"
              value={this.state.user.city}
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel htmlFor="headline">Headline</ControlLabel>
            <FormControl
              type="text"
              name="headline"
              value={this.state.user.headline}
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel htmlFor="summary">Summary</ControlLabel>
            <FormControl
              type="textarea"
              name="summary"
              componentClass="textarea"
              value={this.state.user.summary}
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel htmlFor="slider">Price Per Day</ControlLabel><br />
            <ReactBootstrapSlider
              value={[this.state.user.per_diem.min, this.state.user.per_diem.max]}
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
              value={this.state.user.tag_list}
              onChange={this.onTagChange}
            />
          </FormGroup>
          <FormGroup>
            <Checkbox
              name="onsite"
              checked={this.state.user.onsite}
              onChange={this.onChange}
            > Can work onsite
            </Checkbox>
          </FormGroup>
          <FormGroup>
            <Button onClick={() => this.props.onCancel(this.state.user)}>Cancel</Button>
            <Button type="submit" bsStyle="primary">Submit</Button>
          </FormGroup>
        </form>
      </div>
    );
  }
}

Edit.propTypes = {
  avatarPreview: PropTypes.shape({ preview: PropTypes.string, name: PropTypes.string }),
  user: User.propTypes.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDropAccepted: PropTypes.func.isRequired,
};

Edit.defaultProps = {
  avatarPreview: undefined,
};

export default Edit;
