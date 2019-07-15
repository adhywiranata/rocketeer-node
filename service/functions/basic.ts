import { APIGatewayProxyHandler } from 'aws-lambda';

import {
  jsonResponseUtils,
  lambda,
} from '../../dist';

const basicHandler: APIGatewayProxyHandler = async (event, context) => {
  return jsonResponseUtils.success({
    input: event,
    message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
  });
};

export const handler = lambda(basicHandler);
