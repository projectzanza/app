import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Edit from './components/edit';
import View from './components/view';
import { putUser } from '../actions';
import UserController from '../controller';
import User from '../model';

class ProfileContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      user: props.user,
      mode: props.mode,
      job: props.job,
    };

    this.onEdit = this.onEdit.bind(this);
    this.onCancelEdit = this.onCancelEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClickInvite = this.onClickInvite.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      mode: nextProps.mode,
      job: nextProps.job,
      user: nextProps.user,
    });
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

  onClickInvite(ev) {
    ev.preventDefault();
    UserController.inviteUser(this.store, this.state.job.id, this.state.user.id);
  }

  showInvite() {
    return UserController.showInviteToJob({
      store: this.store,
      job: this.state.job,
      user: this.state.user,
    });
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
        showEdit={UserController.currentUser(this.store).id === _.get(this.state, 'user.id')}
        onEdit={this.onEdit}
        showInvite={this.showInvite()}
        onClickInvite={this.onClickInvite}
      />
    );
  }
}

ProfileContainer.propTypes = {
  user: User.propTypes.isRequired,
  mode: PropTypes.string,
  job: PropTypes.shape({
    id: PropTypes.string,
    user_id: PropTypes.string,
  }),
};

ProfileContainer.defaultProps = {
  mode: 'view',
  job: undefined,
};

ProfileContainer.contextTypes = {
  store: PropTypes.object,
};

export default ProfileContainer;
