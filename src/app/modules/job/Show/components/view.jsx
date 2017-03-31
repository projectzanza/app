import React from 'react';

const View = props => (
  <div>
    <dl className="dl-horizontal">
      <dt>Title</dt>
      <dd>{props.job.title}</dd>
      <dt>Description</dt>
      <dd>{props.job.text}</dd>
    </dl>
  </div>
);

View.propTypes = {
  job: React.PropTypes.shape({
    title: React.PropTypes.string,
    text: React.PropTypes.string,
  }),
};

View.defaultProps = {
  job: {},
};

export default View;

