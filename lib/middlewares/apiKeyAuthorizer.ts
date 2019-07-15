import { HandlerLambda } from 'middy';

import constant from '../constants';
import { jsonResponseUtils } from '../utils';

export default (apiKeyHeaderKey: string, apiKey: string) => ({
  before: ({ event }: HandlerLambda) => new Promise((resolve, reject) => {
    const isFromScheduledEvent = !!event.source && event.source === 'aws.events' || false;
    const isFromInvokedEvent = !!event.headers && event.headers[apiKeyHeaderKey] === apiKey || false;

    if (isFromScheduledEvent || isFromInvokedEvent) {
      return resolve();
    }

    const message = constant.RESPONSE_MESSAGE.INVALID_TOKEN;
    const statusCode = 401;

    return reject({ message, statusCode });
  }),

  onError: (handler: HandlerLambda) => {
    const { message, statusCode }: any = handler.error;

    const response = jsonResponseUtils.failure({ message }, statusCode);

    return handler.callback(null, response);
  },
});
