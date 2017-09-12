import { Types } from './join-actions';
import { updateJoinTableState } from './utils';

export const initialState = {
  entities: {},
};

export const userReviews = (state = initialState, action) => {
  switch (action.type) {
    case Types.USER_REVIEWS:
      return action.data.reduce((loopState, review) =>
        updateJoinTableState(loopState, review.user_id, review.id, action.joinAction),
        state,
      );

    default:
      return state;
  }
};

export const jobReviews = (state = initialState, action) => {
  switch (action.type) {
    case Types.JOB_REVIEWS:
      return action.data.reduce((loopState, review) =>
          updateJoinTableState(loopState, review.job_id, review.id, action.joinAction),
        state,
      );

    default:
      return state;
  }
};

export const subjectReviews = (state = initialState, action) => {
  switch (action.type) {
    case Types.SUBJECT_REVIEWS:
      return action.data.reduce((loopState, review) =>
          updateJoinTableState(loopState, review.subject_id, review.id, action.joinAction),
        state,
      );

    default:
      return state;
  }
};
