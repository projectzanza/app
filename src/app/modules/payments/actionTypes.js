export const Types = {
  HTTP_POST_PAYMENTS_TOKEN: 'HTTP_POST_PAYMENTS_TOKEN',
};

export function httpPostPaymentsToken(token, jobId) {
  return {
    type: Types.HTTP_POST_PAYMENTS_TOKEN,
    token,
    jobId,
  };
}
