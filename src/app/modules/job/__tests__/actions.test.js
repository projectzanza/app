import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../actions';
import * as responses from '../__mocks__/job_responses';
import * as forms from '../__mocks__/job_forms';

const mockStore = configureMockStore([thunk]);

describe('jobActions', () => {
  afterEach(() => {
    nock.cleanAll();
  });


  describe('createJob', () => {
    it('creates HTTP_RESP_JOB on create success', () => {
      nock('http://0.0.0.0:3000')
        .post('/jobs')
        .reply(200, responses.job);

      const expectedActions = [
        {
          type: actions.Actions.HTTP_POST_JOB,
          job: forms.quickCreate,
        },
        {
          type: actions.Actions.HTTP_RESP_JOB,
          result: responses.job,
        },
      ];

      const store = mockStore();

      store.dispatch(actions.createJob(forms.quickCreate))
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
      nock('http://0.0.0.0:3000')
        .get('/jobs/1')
        .reply(200, responses.job);

      const expectedActions = [
        {
          type: actions.Actions.HTTP_GET_JOB,
          id: 1,
        },
        {
          type: actions.Actions.HTTP_RESP_JOB,
          result: responses.job,
        },
      ];

      const store = mockStore();

      store.dispatch(actions.getJob(1))
        .then(() => {
          expect(store.getActions())
            .toEqual(expect.arrayContaining(expectedActions));
        });
    });
  });

  describe('putJob', () => {
    it('creates HTTP_RESP_JOB on put success', () => {
      nock('http://0.0.0.0:3000')
        .put('/jobs/1')
        .reply(200, responses.job);

      const expectedActions = [
        {
          type: actions.Actions.HTTP_PUT_JOB,
          job: forms.existingJob,
        },
        {
          type: actions.Actions.HTTP_RESP_JOB,
          result: responses.job,
        },
      ];

      const store = mockStore();

      store.dispatch(actions.putJob(forms.existingJob))
        .then(() => {
          expect(store.getActions())
            .toEqual(expect.arrayContaining(expectedActions));
        });
    });
  });
});
