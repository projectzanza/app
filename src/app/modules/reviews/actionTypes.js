export const Types = {
  HTTP_RESP_REVIEWS: 'HTTP_RESP_REVIEWS',
};

export const httpRespReviews = json => ({
  type: Types.HTTP_RESP_REVIEWS,
  data: [].concat(json.data),
});
