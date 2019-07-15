import {
  APIGatewayProxyResult,
} from 'aws-lambda';

const apiGatewayProxyResultMock = (
  payload,
): APIGatewayProxyResult => ({
  body: payload.body || '{}',
  headers: payload.headers || undefined,
  statusCode: payload.statusCode,
});

export default apiGatewayProxyResultMock;
