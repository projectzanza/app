import React from 'react';
import PropTypes from 'prop-types';
import List from './components/list';
import Estimate from '../model';
import EstimateController from '../controller';

class EstimateListContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      estimates: this.props.estimates,
    };

    this.onClickEdit = this.onClickEdit.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ estimates: nextProps.estimates });
  }

  onClickEdit(estimate) {
    EstimateController.editEstimate(this.store, estimate);
  }

  onClickDelete(estimate) {
    EstimateController.deleteEstimate(this.store, estimate);
  }

  render() {
    return (
      <List
        estimates={this.state.estimates}
        onClickEdit={this.onClickEdit}
        onClickDelete={this.onClickDelete}
      />
    );
  }
}

EstimateListContainer.contextTypes = {
  store: PropTypes.object,
};

EstimateListContainer.propTypes = {
  estimates: PropTypes.arrayOf(
    Estimate.propTypes,
  ).isRequired,
};

export default EstimateListContainer;
