import { APIGatewayProxyHandler } from 'aws-lambda';

import {
  apiKeyAuthorizerMiddleware,
  lambda,
} from '../../dist';

const withApiKeyHandler: APIGatewayProxyHandler = async (event, context) => {
  return {
    body: JSON.stringify({
      input: event,
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
    }),
    statusCode: 200,
  };
};

export const handler = lambda(withApiKeyHandler, [
  apiKeyAuthorizerMiddleware('dont-use-hard-coded-value-like-me', 'Token'),
]);
