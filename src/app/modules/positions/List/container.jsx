import React from 'react';
import PropTypes from 'prop-types';
import PositionController from '../controller';
import UserController from '../../user/controller';
import List from './components/list';
import User from '../../user/model';

class ListContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      user: props.user,
      positions: [],
      currentUser: UserController.currentUser(this.store),
    };
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
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

  onClickEdit(position) {
    if (this.state.currentUser.id === position.user_id) {
      return () => {
        PositionController.editPosition(this.store, position);
      };
    }
    return undefined;
  }

  onClickDelete(position) {
    if (this.state.currentUser.id === position.user_id) {
      return () => {
        PositionController.deletePosition(this.store, position.user_id, position.id);
      };
    }
    return undefined;
  }

  render() {
    return (<List
      positions={this.state.positions}
      onClickEdit={this.onClickEdit}
      onClickDelete={this.onClickDelete}
    />);
  }
}

ListContainer.propTypes = {
  user: User.propTypes.isRequired,
};

ListContainer.contextTypes = {
  store: PropTypes.object,
};

export default ListContainer;
