import { HandlerLambda } from 'middy';

import constant from '../constants';
import utils from '../utils';

export default (apiKey: string) => ({
  before: (handler: HandlerLambda) => new Promise((resolve, reject) => {
    if (handler.event.headers['api-app-key'] === apiKey) {
      return resolve();
    }

    const message = constant.RESPONSE_MESSAGE.INVALID_TOKEN;
    const statusCode = 401;

    return reject({ message, statusCode });
  }),

  onError: (handler: HandlerLambda) => {
    const { message, statusCode }: any = handler.error;

    const response = utils.JSON_RESPONSE(statusCode, { message });

    return handler.callback(null, response);
  },
});
