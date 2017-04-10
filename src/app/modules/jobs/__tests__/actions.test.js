import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../actions';
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
          type: actions.Actions.HTTP_POST_JOB,
          job: forms.quickCreate,
        },
        {
          type: actions.Actions.HTTP_RESP_JOB,
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
  });

  describe('getJob', () => {
    it('creates HTTP_RESP_JOB on get success', () => {
      nock(Config.apiUrl)
        .get('/jobs/1')
        .reply(200, responses.job);

      const expectedActions = [
        {
          type: actions.Actions.HTTP_GET_JOB,
          id: 1,
        },
        {
          type: actions.Actions.HTTP_RESP_JOB,
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
          type: actions.Actions.HTTP_PUT_JOB,
          job: forms.existingJob,
        },
        {
          type: actions.Actions.HTTP_RESP_JOB,
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

  describe('getJobs', () => {
    it('creates HTTP_RESP_JOB on get success', () => {
      nock(Config.apiUrl)
        .get('/jobs')
        .reply(200, responses.jobs);

      const expectedActions = [
        {
          type: actions.Actions.HTTP_GET_JOBS,
        },
        {
          type: actions.Actions.HTTP_RESP_JOBS,
          data: responses.jobs.data
        },
      ];

      const store = mockStore();

      return store.dispatch(actions.getJobs())
        .then(() => {
          expect(store.getActions())
            .toEqual(expect.arrayContaining(expectedActions));
        });
    });

    it('requests jobs by user id when supplied', () => {
      nock(Config.apiUrl)
        .get('/users/1/jobs')
        .reply(200, responses.jobs);

      const expectedActions = [
        {
          type: actions.Actions.HTTP_GET_JOBS,
        },
        {
          type: actions.Actions.HTTP_RESP_JOBS,
          data: responses.jobs.data
        },
      ];

      const store = mockStore();

      return store.dispatch(actions.getJobs(1))
        .then(() => {
          expect(store.getActions())
            .toEqual(expect.arrayContaining(expectedActions));
        });
    });
  });
});
