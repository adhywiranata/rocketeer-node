import * as warmer from 'lambda-warmer';
import { HandlerLambda } from 'middy';

import { jsonResponseUtils } from '../utils';

export default () => ({
  before: (handler: HandlerLambda) => new Promise(async (resolve, reject) => {
    if (await warmer(handler.event)) {
      return reject();
    }

    return resolve();
  }),

  onError: (handler: HandlerLambda) => {
    const response = jsonResponseUtils.failure({ message: 'warmed' }, 200);

    return handler.callback(null, response);
  },
});
