import React from 'react';
import PropTypes from 'prop-types';
import PositionController from '../controller';
import List from './components/list';
import User from '../../user/model';

class ListContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      user: props.user,
      positions: [],
    };
  }

  componentDidMount() {
    if (this.state.user) {
      PositionController.fetchPositions(this.store, this.state.user.id);
    }

    this.unsubscribe = this.store.subscribe(() => {
      if (this.state.user) {
        this.setState({
          positions: this.state.user.positions(this.store),
        });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.user !== nextProps.user) {
      this.setState({ user: nextProps.user });
      PositionController.fetchPositions(this.store, nextProps.user.id);
    }
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
