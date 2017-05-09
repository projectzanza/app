import React from 'react';
import PropTypes from 'prop-types';
import Edit from './components/edit';
import JobController from '../controller';

class EstimateContainer extends React.Component {
  constructor(props, context){
    super(props, context);
    this.store = context.store;
    this.state = {
      estimate: props.estimate,
    };

    this.onCancelEdit = this.onCancelEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ job: nextProps.estimate });
  }

  onSubmit(e, form){
    e.preventDefault();
    JobController.updateEstimate(this.store, this.props.jobId, form);
  }

  onCancelEdit() {}

  render(){
    return (
      <Edit
        estimate={this.state.estimate}
        onSubmit={this.onSubmit}
        onCancel={this.onCancelEdit}
      />
    )
  }
}

