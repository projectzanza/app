import React from 'react';
import PropTypes from 'prop-types';
import Edit from './components/edit';
import View from './components/view';
import EstimateController from '../controller';
import Estimate from '../model';

class EstimateContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      estimate: props.estimate,
      mode: props.mode,
    };

    this.onClickCancel = this.onClickCancel.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ estimate: nextProps.estimate });
  }

  onSubmit(e, form) {
    e.preventDefault();
    EstimateController.submitEstimate(this.store, this.props.jobId, this.props.userId, form)
      .then(() => {
        this.setState({ mode: 'view' });
      });
  }

  onClickEdit() {
    this.setState({ mode: 'edit' });
  }

  onClickCancel() {
    this.setState({ mode: 'view' });
  }

  render() {
    if (this.state.mode === 'edit') {
      return (
        <Edit
          estimate={this.state.estimate}
          onSubmit={this.onSubmit}
          onClickCancel={this.onClickCancel}
        />
      );
    }
    return (
      <View
        estimate={this.state.estimate}
        onClickEdit={this.onClickEdit}
      />
    );
  }
}

EstimateContainer.propTypes = {
  userId: PropTypes.string.isRequired,
  jobId: PropTypes.string.isRequired,
  estimate: Estimate.propTypes,
  mode: PropTypes.string,
};

EstimateContainer.defaultProps = {
  estimate: new Estimate(),
  mode: 'view',
};

EstimateContainer.contextTypes = {
  store: PropTypes.object,
};

export default EstimateContainer;

