import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import Config from 'Config';
import _ from 'lodash';
import * as actionTypes from '../actionTypes';
import * as actions from '../actions';
import * as joinActionTypes from '../../../lib/reducers/join-actions';
import { Types as estimateTypes } from '../../estimates/actionTypes';
import * as responses from '../__mocks__/job_responses';
import * as forms from '../__mocks__/job_forms';

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
          userId,
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
          userId,
          joinAction: 'reset',
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

  describe('getCollaboratingJobs', () => {
    it('should create HTTP_RESP_JOB and USER_COLLABORATING_JOBS on success', () => {
      const userId = 1;
      const response = responses.jobsWithEstimates;

      nock(Config.apiUrl)
        .get('/jobs/collaborating')
        .reply(200, response);


      const jobIds = response.data.map(job => job.id);
      const estimatesJson = _.flatten(response.data.map(job => job.meta.current_user.estimates));

      const expectedActions = [
        {
          type: actionTypes.Types.HTTP_GET_JOBS,
        },
        {
          type: actionTypes.Types.HTTP_RESP_JOBS,
          data: response.data,
        },
        {
          type: joinActionTypes.Types.USER_COLLABORATING_JOBS,
          jobIds,
          userId,
          joinAction: 'reset',
        },
        {
          type: estimateTypes.HTTP_RESP_ESTIMATES,
          data: estimatesJson,
        },
        {
          type: joinActionTypes.Types.JOB_ESTIMATES,
          data: estimatesJson,
          joinAction: 'merge',
        },
        {
          type: joinActionTypes.Types.USER_ESTIMATES,
          data: estimatesJson,
          joinAction: 'merge',
        },
      ];

      const store = mockStore();

      return store.dispatch(actions.getCollaboratingJobs({ userId }))
        .then(() => {
          expect(store.getActions())
            .toEqual(expect.arrayContaining(expectedActions));
        });
    });
  });

  describe('postAcceptJob', () => {
    it('should create HTTP_RESP_JOBS on success', () => {
      const jobId = 1;
      const userId = 1000;

      nock(Config.apiUrl)
        .post(`/jobs/${jobId}/accept`)
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
          type: joinActionTypes.Types.USER_COLLABORATING_JOBS,
          jobIds: responses.jobs.data.map(job => job.id),
          joinAction: 'merge',
          userId,
        },
      ];

      const store = mockStore();

      return store.dispatch(actions.postAcceptJob({ jobId, userId }))
        .then(() => {
          expect(store.getActions()).toEqual(
            expect.arrayContaining(expectedActions),
          );
        });
    });
  });

  describe('postCompleteJob', () => {
    it('should create HTTP_RESP_JOB on success', () => {
      const jobId = 1;

      nock(Config.apiUrl)
        .post(`/jobs/${jobId}/complete`)
        .reply(200, responses.completedJob);

      const expectedActions = [
        {
          type: actionTypes.Types.HTTP_GET_JOB,
        },
        {
          type: actionTypes.Types.HTTP_RESP_JOB,
          data: responses.completedJob.data,
        },
      ];

      const store = mockStore();

      return store.dispatch(actions.postCompleteJob(jobId))
        .then(() => {
          expect(store.getActions()).toEqual(
            expect.arrayContaining(expectedActions),
          );
        });
    });
  });

  describe('postVerifyJob', () => {
    it('should create HTTP_RESP_JOB on success', () => {
      const jobId = 1;

      nock(Config.apiUrl)
        .post(`/jobs/${jobId}/verify`)
        .reply(200, responses.verifiedJob);

      const expectedActions = [
        {
          type: actionTypes.Types.HTTP_GET_JOB,
        },
        {
          type: actionTypes.Types.HTTP_RESP_JOB,
          data: responses.verifiedJob.data,
        },
      ];

      const store = mockStore();

      return store.dispatch(actions.postVerifyJob({ jobId }))
        .then(() => {
          expect(store.getActions()).toEqual(
            expect.arrayContaining(expectedActions),
          );
        });
    });
  });
});
