import { APIGatewayProxyHandler } from 'aws-lambda';
import Middy from 'middy';
import {
  doNotWaitForEmptyEventLoop,
  httpErrorHandler,
  httpEventNormalizer,
  httpHeaderNormalizer,
  httpSecurityHeaders,
  jsonBodyParser,
} from 'middy/middlewares';

import {
  noopMiddleware,
  warmerInterceptorMiddleware,
} from './middlewares';

interface ILambdaOptions {
  applyWarmer?: boolean;
}

type Middleware =  Middy.MiddlewareObject<any, any>;

const defaultMiddlewares = [
  doNotWaitForEmptyEventLoop({ runOnError: true }),
  jsonBodyParser(),
  httpEventNormalizer(),
  httpHeaderNormalizer(),
  httpSecurityHeaders(),
  httpErrorHandler(),
];

const defaultOptions: ILambdaOptions = {
  applyWarmer: false,
};

const applyMiddleware =
  (handler: any, middleware: Middleware) =>
    handler.use(middleware);

const lambda = (
  handlerFunc: APIGatewayProxyHandler,
  middlewares: Array<Middleware> = [],
  options: ILambdaOptions = defaultOptions,
) => {
  return [
    ...defaultMiddlewares,
    ...middlewares,
    options.applyWarmer ? warmerInterceptorMiddleware() : noopMiddleware(),
  ].reduce(applyMiddleware, Middy(handlerFunc));
};

export { lambda };
