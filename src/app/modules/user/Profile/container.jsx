import React from 'react';
import Edit from './components/edit';
import { getUser, putUser } from '../actions';
import { selectedUser } from '../utils';

class ProfileContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { user: {} };
  }

  componentWillMount() {
    const user = selectedUser(this.store, this.props.params.id);
    if (user) {
      this.setState({ user });
    } else {
      this.store.dispatch(getUser(this.props.params.id));
    }
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      this.setState({ user: selectedUser(this.store, this.props.params.id) });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onSubmit(ev, user) {
    ev.preventDefault();
    this.store.dispatch(putUser(user))
      .then(() => {
        this.props.onUpdateSuccess(selectedUser(this.store, this.props.params.id));
      });
  }

  render() {
    return (
      <Edit
        user={this.state.user}
        onSubmit={this.onSubmit}
        onCancel={this.props.onCancelEdit}
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
};

ProfileContainer.contextTypes = {
  store: React.PropTypes.object,
};

export default ProfileContainer;
