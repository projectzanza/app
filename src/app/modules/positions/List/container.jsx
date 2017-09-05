import React from 'react';
import PropTypes from 'prop-types';
import PositionController from '../controller';
import List from './components/list';
import User from '../../user/model';

class ListContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = { positions: [] };
  }

  componentDidMount() {
    PositionController.fetchPositions(this.store, this.props.user.id);
    this.unsubscribe = this.store.subscribe(() => {
      this.setState({
        positions: this.props.user.positions(this.store),
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return <List positions={this.state.positions} />;
  }
}

ListContainer.propTypes = {
  user: User.propTypes.isRequired,
};

ListContainer.contextTypes = {
  store: PropTypes.object,
};

export default ListContainer;
