import { APIGatewayProxyHandler } from 'aws-lambda';

import {
  eventValidatorMiddleware,
  lambda,
  ValidationHelper,
} from '../../dist';

const validationSchema = {
  body: {
    abool: ValidationHelper.boolean('abool'),
    message: ValidationHelper.string('message').required(),
  },
};

const withEventValidator: APIGatewayProxyHandler = async (event, context) => {
  return {
    body: JSON.stringify({
      input: event,
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
    }),
    statusCode: 200,
  };
};

export const handler = lambda(withEventValidator, [
  eventValidatorMiddleware({ schema: validationSchema }),
]);
