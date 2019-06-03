import * as warmer from 'lambda-warmer';
import { HandlerLambda } from 'middy';

import utils from '../utils';

export default () => ({
  before: (handler: HandlerLambda) => new Promise(async (resolve, reject) => {
    if (await warmer(handler.event)) {
      return reject();
    }

    return resolve();
  }),

  onError: (handler: HandlerLambda) => {
    const response = utils.JSON_RESPONSE(200, { message: 'warmed' });
    return handler.callback(null, response);
  },
});
