export const Types = {
  HTTP_RESP_POSITIONS: 'HTTP_RESP_POSITIONS',
  HTTP_RESP_DELETE_POSITION: 'HTTP_RESP_DELETE_POSITION',
};

export const httpRespPositions = json => ({
  type: Types.HTTP_RESP_POSITIONS,
  data: json.data,
});

export const httpRespDeletePositions = positionId => ({
  type: Types.HTTP_RESP_DELETE_POSITION,
  positionId,
});
