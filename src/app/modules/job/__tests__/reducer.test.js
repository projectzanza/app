import reducer, { initialState } from '../reducer';
import * as actions from '../actions';
import * as forms from '../__mocks__/job_forms';
import * as responses from '../__mocks__/job_responses';

describe('job reducer', () => {
  it('should return an initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual(initialState);
  });

  describe('HTTP_POST_JOB', () => {
    it('should set loading to true', () => {
      const action = actions.httpPostJob(forms.quickCreate);

      expect(reducer(undefined, action))
        .toEqual(
          Object.assign(
            {},
            initialState,
            { loading: true },
          ),
        );
    });
  });

  describe('HTTP_RESP_JOB', () => {
    it('should set loading to false and set response json', () => {
      const action = actions.httpRespJob(responses.job);

      expect(reducer({ loading: true }, action))
        .toEqual(
          Object.assign(
            {},
            responses.job,
            { loading: false },
          ),
        );
    });

    it('should override null values from the server with defaults', () => {
      const action = actions.httpRespJob(responses.jobNullValues);

      expect(reducer({ loading: true }, action))
        .toEqual(
          Object.assign(
            {},
            responses.jobNullValues,
            {
              loading: false,
              tag_list: [],
              per_diem: { min: 0, max: 1000 },
            },
          ),
        );
    });
  });

  describe('HTTP_GET_JOB', () => {
    it('should set loading to object with loading id', () => {
      const action = actions.httpGetJob(1);

      expect(reducer(undefined, action))
        .toEqual(
          Object.assign(
            {},
            initialState,
            { loading: { id: 1 } },
          ),
        );
    });
  });

  describe('HTTP_PUT_JOB', () => {
    it('should update job and set loading to true', () => {
      const action = actions.httpPutJob(forms.existingJob);

      expect(reducer(undefined, action))
        .toEqual(
          Object.assign(
            {},
            initialState,
            { loading: { id: forms.existingJob.id } },
            forms.existingJob,
          ),
        );
    });
  });
});
