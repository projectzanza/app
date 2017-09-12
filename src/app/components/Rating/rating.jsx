import React from 'react';
import PropTypes from 'prop-types';
import ReactRating from 'react-rating';
import { Glyphicon } from 'react-bootstrap';

const StarRating = props => (
  <ReactRating
    start={0}
    stop={5}
    step={1}
    empty={<Glyphicon glyph="star-empty" />}
    placeholder={<Glyphicon glyph="star" />}
    full={<Glyphicon glyph="star" />}
    onChange={rating => props.onChange(props.name, rating)}
    placeholderRate={props.value}
    readonly={props.readonly}
  />
);

StarRating.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  readonly: PropTypes.bool,
};

StarRating.defaultProps = {
  readonly: false,
  onChange: undefined,
};

export default StarRating;
