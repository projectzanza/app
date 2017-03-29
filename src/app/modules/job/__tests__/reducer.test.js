import reducer from '../reducer';
import * as actions from '../actions';
import * as forms from '../__mocks__/job_forms';
import * as responses from '../__mocks__/job_responses';

describe('job reducer', () => {
  it('should return an initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual({ loading: false });
  });

  describe('HTTP_POST_JOB', () => {
    it('should set loading to true', () => {
      const action = actions.httpPostJob(forms.quickCreate);

      expect(reducer(undefined, action))
        .toEqual(
          { loading: true }
        )
    });
  });

  describe('HTTP_RESP_JOB', () => {
    it('should set loading to false and set resp data', () => {
      const action = actions.httpRespJob(responses.job);

      expect(reducer({ loading: true }, action))
        .toEqual(
          Object.assign(
            {},
            responses.job.data,
            { loading: false },
          )
        );
    });
  });
});
