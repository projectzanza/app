import React from 'react';
import Edit from './components/edit';
import View from './components/view';
import { getUser, putUser } from '../actions';
import { singleItem } from '../../../lib/store/utils';
import { currentUser } from '../utils';

class ProfileContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      user: {},
      mode: props.params.mode,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.setUser(this.props.params.id);
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      this.setState({ user: singleItem(this.store, 'user', this.props.params.id) });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ mode: nextProps.params.mode });
    this.setUser(nextProps.params.id);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onSubmit(ev, form) {
    ev.preventDefault();
    this.store.dispatch(putUser(form))
      .then(() => {
        this.props.onUpdateSuccess(this.state.user);
      });
  }

  setUser(id) {
    const user = singleItem(this.store, 'user', id);
    if (user) {
      this.setState({ user });
    } else {
      this.store.dispatch(getUser(this.props.params.id));
    }
  }

  render() {
    if (this.state.mode === 'edit') {
      return (
        <Edit
          user={this.state.user}
          onSubmit={this.onSubmit}
          onCancel={this.props.onCancelEdit}
        />
      );
    }
    return (
      <View
        user={this.state.user}
        showEdit={currentUser(this.store).id === this.state.user.id}
        onEdit={this.props.onEdit}
      />
    );
  }
}

ProfileContainer.propTypes = {
  params: React.PropTypes.shape({
    id: React.PropTypes.string,
    mode: React.PropTypes.string,
  }).isRequired,
  onUpdateSuccess: React.PropTypes.func.isRequired,
  onCancelEdit: React.PropTypes.func.isRequired,
  onEdit: React.PropTypes.func.isRequired,
};

ProfileContainer.contextTypes = {
  store: React.PropTypes.object,
};

export default ProfileContainer;
