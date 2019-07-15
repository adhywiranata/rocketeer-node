import { APIGatewayProxyHandler } from 'aws-lambda';

import {
  apiKeyAuthorizerMiddleware,
  jsonResponseUtils,
  lambda,
} from '../../dist';

const withApiKeyHandler: APIGatewayProxyHandler = async (event, context) => {
  return jsonResponseUtils.success({
    input: event,
    message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
  });
};

export const handler = lambda(withApiKeyHandler, [
  apiKeyAuthorizerMiddleware('Token', 'dont-use-hard-coded-value-like-me'),
]);
