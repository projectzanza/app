import React from 'react';
import PropTypes from 'prop-types';
import Edit from './components/edit';
import View from './components/view';
import { getUser, putUser } from '../actions';
import UserController from '../controller';
import User from '../model';

class ProfileContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      user: {},
      mode: props.mode,
    };

    this.onEdit = this.onEdit.bind(this);
    this.onCancelEdit = this.onCancelEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.setUser(this.props.id);
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      this.setState({ user: User.find(this.store, this.props.id) });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ mode: nextProps.mode });
    if (this.props.id !== nextProps.id) {
      this.setUser(nextProps.id);
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onSubmit(ev, form) {
    ev.preventDefault();
    this.store.dispatch(putUser(form))
      .then(() => {
        this.setState({ mode: 'view' });
      });
  }

  onCancelEdit() {
    this.setState({ mode: 'view' });
  }

  onEdit() {
    this.setState({ mode: 'edit' });
  }

  setUser(id) {
    const user = User.find(this.store, id);
    if (user) {
      this.setState({ user });
    } else {
      this.store.dispatch(getUser(this.props.id));
    }
  }

  render() {
    if (this.state.mode === 'edit') {
      return (
        <Edit
          user={this.state.user}
          onSubmit={this.onSubmit}
          onCancel={this.onCancelEdit}
        />
      );
    }
    return (
      <View
        user={this.state.user}
        showEdit={UserController.currentUser(this.store).id === this.state.user.id}
        onEdit={this.onEdit}
      />
    );
  }
}

ProfileContainer.propTypes = {
  id: PropTypes.string.isRequired,
  mode: PropTypes.string,
};

ProfileContainer.defaultProps = {
  mode: 'view',
};

ProfileContainer.contextTypes = {
  store: PropTypes.object,
};

export default ProfileContainer;
