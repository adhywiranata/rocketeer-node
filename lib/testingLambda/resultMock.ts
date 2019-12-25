// import {
//   APIGatewayProxyResult,
// } from 'aws-lambda';

const apiGatewayProxyResultMock = (
  payload,
): any => ({
  body: payload.body || '{}',
  headers: payload.headers || undefined,
  statusCode: payload.statusCode,
});

export default apiGatewayProxyResultMock;
