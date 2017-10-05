import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import Edit from './components/edit';
import View from './components/view';
import { putUser } from '../actions';
import UserController from '../controller';
import User from '../model';
import * as Uploads from '../../../lib/uploads/uploads';
import routes from '../../../scenes/routes';

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
    this.onDropAccepted = this.onDropAccepted.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      mode: nextProps.mode,
      job: nextProps.job,
      user: nextProps.user,
    });
  }

  onDropAccepted(acceptedFiles) {
    acceptedFiles.forEach((file) => {
      this.setState({ avatarPreview: file });
      Uploads.requestSignedUploadUrl(this.store, file).then((signedPost) => {
        this.setState({ signedPost });
      });
    });
  }

  onSubmit(ev, form) {
    ev.preventDefault();
    if (this.state.avatarPreview && this.state.signedPost) {
      // upload the file to directly S3 then place the upload URL into the user form
      // so the rails server can access the file and process it
      Uploads.uploadFile(this.store, this.state.signedPost, this.state.avatarPreview)
        .then((uploadLocation) => {
          form.avatar_upload_url = uploadLocation;
          this.store.dispatch(putUser(form));
          this.onCancelEdit();
        });
    } else {
      this.store.dispatch(putUser(form))
        .then(() => {
          this.onCancelEdit();
        });
    }
  }

  onCancelEdit() {
    browserHistory.replace(routes.user.show(this.state.user.id));
    this.setState({ mode: 'view' });
  }

  onEdit() {
    browserHistory.replace(routes.user.edit(this.state.user.id));
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
          avatarPreview={this.state.avatarPreview}
          user={this.state.user}
          onSubmit={this.onSubmit}
          onCancel={this.onCancelEdit}
          onDropAccepted={this.onDropAccepted}
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
