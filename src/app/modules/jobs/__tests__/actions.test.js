import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actionTypes from '../actionTypes';
import * as actions from '../actions';
import * as joinActionTypes from '../../../lib/reducers/join-actions'
import * as responses from '../__mocks__/job_responses';
import * as forms from '../__mocks__/job_forms';
import Config from '../../../config/app';

const mockStore = configureMockStore([thunk]);

describe('jobActions', () => {
  afterEach(() => {
    nock.cleanAll();
  });


  describe('createJob', () => {
    it('creates HTTP_RESP_JOB on create success', () => {
      nock(Config.apiUrl)
        .post('/jobs')
        .reply(200, responses.job);

      const expectedActions = [
        {
          type: actionTypes.Types.HTTP_POST_JOB,
          job: forms.quickCreate,
        },
        {
          type: actionTypes.Types.HTTP_RESP_JOB,
          data: responses.job.data,
        },
      ];

      const store = mockStore();

      return store.dispatch(actions.createJob(forms.quickCreate))
        .then(() => {
          expect(
            store.getActions(),
          ).toEqual(
            expect.arrayContaining(expectedActions),
          );
        });
    });

    it('should return the id of the created job', () => {
      nock(Config.apiUrl)
        .post('/jobs')
        .reply(200, responses.job);

      const store = mockStore();

      return store.dispatch(actions.createJob(forms.quickCreate))
        .then((id) => {
          expect(id).toEqual(responses.job.data.id);
        });
    });
  });

  describe('getJob', () => {
    it('creates HTTP_RESP_JOB on get success', () => {
      nock(Config.apiUrl)
        .get('/jobs/1')
        .reply(200, responses.job);

      const expectedActions = [
        {
          type: actionTypes.Types.HTTP_GET_JOB,
          id: 1,
        },
        {
          type: actionTypes.Types.HTTP_RESP_JOB,
          data: responses.job.data,
        },
      ];

      const store = mockStore();

      return store.dispatch(actions.getJob(1))
        .then(() => {
          expect(store.getActions())
            .toEqual(expect.arrayContaining(expectedActions));
        });
    });
  });

  describe('putJob', () => {
    it('creates HTTP_RESP_JOB on put success', () => {
      nock(Config.apiUrl)
        .put('/jobs/1')
        .reply(200, responses.job);

      const expectedActions = [
        {
          type: actionTypes.Types.HTTP_PUT_JOB,
          job: forms.existingJob,
        },
        {
          type: actionTypes.Types.HTTP_RESP_JOB,
          data: responses.job.data,
        },
      ];

      const store = mockStore();

      return store.dispatch(actions.putJob(forms.existingJob))
        .then(() => {
          expect(store.getActions())
            .toEqual(expect.arrayContaining(expectedActions));
        });
    });
  });

  describe('getUserJobs', () => {
    it('requests jobs by user id', () => {
      const userId = 1;

      nock(Config.apiUrl)
        .get(`/users/${userId}/jobs`)
        .reply(200, responses.jobs);

      const expectedActions = [
        {
          type: actionTypes.Types.HTTP_GET_JOBS,
        },
        {
          type: actionTypes.Types.HTTP_RESP_JOBS,
          data: responses.jobs.data,
        },
        {
          type: joinActionTypes.Types.USER_JOBS,
          jobIds: responses.jobs.data.map(job => job.id),
          userId
        },
      ];

      const store = mockStore();

      return store.dispatch(actions.getUserJobs({ userId }))
        .then(() => {
          expect(store.getActions())
            .toEqual(expect.arrayContaining(expectedActions));
        });
    });
  });

  describe('getMatchingJobsForUser', () => {
    it('should create HTTP_RESP_JOB and USER_MATCHING_JOBS on success', () => {
      const userId = 1;

      nock(Config.apiUrl)
        .get(`/users/${userId}/jobs/match`)
        .reply(200, responses.jobs);

      const expectedActions = [
        {
          type: actionTypes.Types.HTTP_GET_JOBS,
        },
        {
          type: actionTypes.Types.HTTP_RESP_JOBS,
          data: responses.jobs.data,
        },
        {
          type: joinActionTypes.Types.USER_MATCHING_JOBS,
          jobIds: responses.jobs.data.map(job => job.id),
          userId
        },
      ];

      const store = mockStore();

      return store.dispatch(actions.getMatchingJobsForUser({ userId }))
        .then(() => {
          expect(store.getActions())
            .toEqual(expect.arrayContaining(expectedActions));
        });
    });
  });
});
