import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEvent,
} from 'aws-lambda';

const apiGatewayContext: APIGatewayEventRequestContext = {
  accountId: '',
  apiId: '',
  authorizer: null,
  connectedAt: undefined,
  connectionId: undefined,
  domainName: undefined,
  eventType: undefined,
  extendedRequestId: undefined,
  httpMethod: '',
  identity: {
    accessKey: '',
    accountId: '',
    apiKey: '',
    apiKeyId: '',
    caller: '',
    cognitoAuthenticationProvider: '',
    cognitoAuthenticationType: '',
    cognitoIdentityId: '',
    cognitoIdentityPoolId: '',
    sourceIp: '',
    user: '',
    userAgent: '',
    userArn: '',
  },
  messageDirection: undefined,
  messageId: null,
  path: '',
  requestId: '',
  requestTime: undefined,
  requestTimeEpoch: 0,
  resourceId: '',
  resourcePath: '',
  routeKey: undefined,
  stage: '',
};

const apiGatewayEventMock: APIGatewayProxyEvent = {
  body: '{}',
  headers: {},
  httpMethod: 'GET',
  isBase64Encoded: false,
  multiValueHeaders: {},
  multiValueQueryStringParameters: {},
  path: '',
  pathParameters: {},
  queryStringParameters: {},
  requestContext: apiGatewayContext,
  resource: '',
  stageVariables: {},
};

export default apiGatewayEventMock;
