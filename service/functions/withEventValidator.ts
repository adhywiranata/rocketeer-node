import { APIGatewayProxyHandler } from 'aws-lambda';

import {
  eventValidatorMiddleware,
  jsonResponseUtils,
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
  return jsonResponseUtils.success({
    input: event,
    message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
  });
};

export const handler = lambda(withEventValidator, [
  eventValidatorMiddleware({ schema: validationSchema }),
]);
