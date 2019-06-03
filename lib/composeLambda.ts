import { APIGatewayProxyHandler } from 'aws-lambda';
import * as Middy from 'middy';
import { doNotWaitForEmptyEventLoop } from 'middy/middlewares';

import { interceptWarmer as interceptWarmerMiddleware } from './middlewares';

interface ILambdaOptions {
  applyWarmer?: boolean;
}

type Middleware =  Middy.MiddlewareObject<any, any>;

const defaultMiddlewares = [
  doNotWaitForEmptyEventLoop({ runOnError: true }),
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
    middlewares,
    options.applyWarmer ? interceptWarmerMiddleware : null,
  ].reduce(applyMiddleware, Middy(handlerFunc));
};

export { lambda };
