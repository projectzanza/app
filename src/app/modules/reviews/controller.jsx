import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import _ from 'lodash';
import * as actions from './actions';
import ModalEditReview from './Edit/container';
import Review from './model';

export default class ReviewController {
  static submitReview(store, review) {
    return store.dispatch(actions.submitReview(review));
  }

  static fetchReviews(store, resource, id) {
    return store.dispatch(actions.getReviews(resource, id));
  }

  static createReview(store, jobId, subjectId) {
    ReactDOM.render(
      <ReduxProvider store={store}>
        <ModalEditReview
          review={new Review({ job_id: jobId, subject_id: subjectId })}
          show
        />
      </ReduxProvider>,
      document.getElementById('modal'),
    );
  }

  static editReview(store, review) {
    ReactDOM.render(
      <ReduxProvider store={store}>
        <ModalEditReview
          review={review}
          show
        />
      </ReduxProvider>,
      document.getElementById('modal'),
    );
  }

  static subjectId(job, currentUser, acceptedUser) {
    if (!(job && currentUser && acceptedUser)) {
      return undefined;
    }
    const subjectId = _.difference(
      [job.user_id, acceptedUser.id],
      [currentUser.id],
    );
    return subjectId.length === 1 ? subjectId[0] : undefined;
  }
}
