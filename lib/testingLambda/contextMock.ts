import {
  Context,
} from 'aws-lambda';

const apiGatewayContextMock: Context = {
  awsRequestId: '',
  callbackWaitsForEmptyEventLoop: false,
  clientContext: undefined,
  done: () => ({}),
  fail: () => ({}),
  functionName: '',
  functionVersion: '',
  getRemainingTimeInMillis: () => 0,
  identity: undefined,
  invokedFunctionArn: '',
  logGroupName: '',
  logStreamName: '',
  memoryLimitInMB: 512,
  succeed: () => ({}),
};

export default apiGatewayContextMock;
