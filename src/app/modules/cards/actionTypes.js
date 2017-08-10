export const Types = {
  HTTP_POST_PAYMENTS_TOKEN: 'HTTP_POST_PAYMENTS_TOKEN',
  HTTP_RESP_CARDS: 'HTTP_RESP_CARDS',
};

export function httpPostPaymentsToken(token, jobId) {
  return {
    type: Types.HTTP_POST_PAYMENTS_TOKEN,
    token,
    jobId,
  };
}

export function httpRespCards(cards) {
  return {
    type: Types.HTTP_RESP_CARDS,
    data: cards.data,
  };
}
