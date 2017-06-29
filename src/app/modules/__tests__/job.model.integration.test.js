import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import nock from 'nock';
import rootReducer from '../../reducers';
import * as jobResponses from '../jobs/__mocks__/job_responses';
import * as userResponses from '../user/__mocks__/user_responses';
import UserController from '../user/controller';
import JobController from '../jobs/controller';
import Job from '../jobs/model';
import Config from '../../config/app';

describe('job model integration', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  describe('matchingUsers', () => {
    it('should return matching users for a job', () => {
      const jobId = 1;
      const store = createStore(
        rootReducer,
        applyMiddleware(thunkMiddleware),
      );

      nock(Config.apiUrl)
        .get(`/jobs/${jobId}`)
        .reply(200, jobResponses.job);
      return JobController.fetchJob(store, jobId).then(() => {
        nock(Config.apiUrl)
          .get(`/jobs/${jobId}/users/match`)
          .reply(200, userResponses.users);
        UserController.fetchMatchingUsersForJob(store, jobId).then(() => {
          expect(Job.find(store, jobId).matchingUsers(store).length)
            .toEqual(2);
        });
      });
    });
  });

  describe('collaboratingUsers', () => {
    it('should return collaborating users for a job', () => {
      const jobId = 1;
      const store = createStore(
        rootReducer,
        applyMiddleware(thunkMiddleware),
      );

      nock(Config.apiUrl)
        .get(`/jobs/${jobId}`)
        .reply(200, jobResponses.job);
      return JobController.fetchJob(store, jobId).then(() => {
        nock(Config.apiUrl)
          .get(`/jobs/${jobId}/users/collaborating`)
          .reply(200, userResponses.collaboratingUsers);
        UserController.fetchCollaboratingUsersForJob(store, { jobId }).then(() => {
          expect(Job.find(store, jobId).collaboratingUsers(store).length).toEqual(8);
          expect(Job.find(store, jobId).invitedUsers(store).length).toEqual(2);
          expect(Job.find(store, jobId).interestedUsers(store).length).toEqual(2);
          expect(Job.find(store, jobId).prospectiveUsers(store).length).toEqual(2);
          expect(Job.find(store, jobId).awardedUsers(store).length).toEqual(1);
          expect(Job.find(store, jobId).participatingUsers(store).length).toEqual(1);
        });
      });
    });
  });
});
