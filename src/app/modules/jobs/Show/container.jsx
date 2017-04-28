import React from 'react';
import Edit from './components/edit';
import View from './components/view';
import { putJob } from '../actions';
import Job from '../model';

class ShowJobContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      job: props.job,
      mode: props.mode,
    };

    this.onEdit = this.onEdit.bind(this);
    this.onCancelEdit = this.onCancelEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      mode: nextProps.mode,
      job: nextProps.job,
    });
  }

  onSubmit(e, form) {
    e.preventDefault();
    this.store.dispatch(putJob(form))
      .then(() => { this.setState({ mode: 'view' }); });
  }

  onEdit() {
    this.setState({ mode: 'edit' });
  }

  onCancelEdit() {
    this.setState({ mode: 'view' });
  }

  render() {
    if (this.state.mode === 'edit') {
      return (
        <Edit
          job={this.state.job}
          onSubmit={this.onSubmit}
          onCancel={this.onCancelEdit}
        />
      );
    }
    return (
      <View
        job={this.state.job}
        showEdit={this.props.currentUser.id === this.state.job.user_id}
        onEdit={this.onEdit}
      />
    );
  }
}

ShowJobContainer.propTypes = {
  job: Job.propTypes,
  mode: React.PropTypes.string,
  currentUser: React.PropTypes.shape({
    id: React.PropTypes.string,
  }).isRequired,
};

ShowJobContainer.defaultProps = {
  matchingUserListScene: undefined,
  mode: 'view',
  job: new Job(),
};

ShowJobContainer.contextTypes = {
  store: React.PropTypes.object,
};

export default ShowJobContainer;
