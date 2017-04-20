import React from 'react';
import { browserHistory } from 'react-router';
import UserController from '../../modules/user/controller';
import JobController from '../../modules/jobs/controller';
import ShowJob from '../../modules/jobs/Show/container';
import UserList from '../../modules/user/List/container';
import routes from '../routes';

class JobShowScene extends React.Component {
  static onClickUser(ev, user) {
    ev.preventDefault();
    browserHistory.push(routes.user.profile(user.id));
  }

  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      user: UserController.currentUser(this.store),
    };
  }

  componentWillMount() {
    JobController.fetchJob(this.store, this.props.params.id)
      .then(job => this.setState({ job }));
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      const job = JobController.getJob(this.store, this.props.params.id);
      if (job) {
        this.setState({ job });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  matchingUserList() {
    if (this.state.job && this.state.job.user_id === this.state.user.id) {
      return (
        <UserList
          jobId={this.state.job.id}
          onClickUser={JobShowScene.onClickUser}
        />
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        <ShowJob
          job={this.state.job}
          mode={this.props.params.mode}
          currentUser={this.state.user}
        />
        {this.matchingUserList()}
      </div>
    );
  }
}

JobShowScene.propTypes = {
  params: React.PropTypes.shape({
    id: React.PropTypes.string,
    mode: React.PropTypes.string,
  }).isRequired,
};

JobShowScene.contextTypes = {
  store: React.PropTypes.object,
};

export default JobShowScene;
