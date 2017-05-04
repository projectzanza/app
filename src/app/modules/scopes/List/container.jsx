import React from 'react';
import PropTypes from 'prop-types';
import List from './components/list';
import ScopeController from '../controller';

class ListContainer extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      scopes: [],
    };
  }

  componentDidMount() {
    ScopeController.fetchScopes(this.store, this.props.job.id);

    this.unsubscribe = this.store.subscribe(() => {
      if (this.props.job) {
        this.setState({ scopes: this.props.job.scopes(this.store) });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (<List
      scopes={this.state.scopes}
      jobId={this.props.job.id}
    />);
  }
}

ListContainer.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.string,
    scopes: PropTypes.func,
  }),
};

ListContainer.defaultProps = {
  job: undefined,
};

ListContainer.contextTypes = {
  store: PropTypes.object,
};

export default ListContainer;
