/* attribution: https://github.com/keboola/middy-event-validator/blob/master/src/eventValidator.js */
import createError from 'http-errors';
import Joi from 'joi';
import _ from 'lodash';

interface IEventSchema {
  body?: any;
  headers?: any;
  pathParameters?: any;
  queryStringParameters?: any;
}

const buildSchema = (def) => {
  const body = _.get(def, 'body', {});
  const headers = _.get(def, 'headers', {});
  const path = _.get(def, 'path', {});
  const query = _.get(def, 'query', {});

  if (_.has(def, 'pagination')) {
    query.offset = Joi.number().integer().default(0)
      .min(0)
      .allow('')
      .error(createError(422, 'Parameter offset must be integer greater then 0'));
    const max = _.get(def, 'pagination.max', 1000);
    query.limit = Joi.number().integer().default(max)
      .min(1)
      .max(_.get(def, 'pagination.max', max))
      .allow('')
      .error(createError(422, `Parameter limit must be integer between 1 and ${max}`));
  }

  const res: IEventSchema = {};
  if (_.size(body)) {
    res.body = Joi.object().allow(null).keys(body);
  }
  if (_.size(headers)) {
    res.headers = Joi.object().allow(null).keys(headers);
  }
  if (_.size(path)) {
    res.pathParameters = Joi.object().allow(null).keys(path);
  }
  if (_.size(query)) {
    res.queryStringParameters = Joi.object().allow(null).keys(query);
  }

  return res;
};

export default function eventValidator({ schema }) {
  return {
    before: (handler, next) => {
      const res = Joi.validate(
        handler.event,
        buildSchema(schema),
        { allowUnknown: true, stripUnknown: true },
      );
      if (res.error) {
        throw createError(422, res.error.message);
      }
      next();
    },
  };
}

export class Validation {
  public static getJoi() {
    return Joi;
  }

  public static forbidden(param) {
    return Joi.any().forbidden().error(createError(`Setting of parameter ${param} is forbidden`));
  }

  public static boolean(param) {
    return Joi.boolean().optional()
      .error(createError(`Parameter ${param} must be a boolean`));
  }

  public static string(param) {
    return Joi.string().optional().allow(null).trim()
      .error(createError(`Parameter ${param} must be a string`));
  }

  public static stringMaxLength(param, length) {
    return Joi.string().max(length).optional().allow(null)
      .trim()
      .error(createError(`Parameter ${param} must be a string with max length of ${length}`));
  }

  public static integer(param) {
    return Joi.number().integer().optional().allow(null)
      .error(createError(`Parameter ${param} must be an integer`));
  }

  public static object(param) {
    return Joi.object().optional().allow(null)
      .error(createError(`Parameter ${param} must be an object`));
  }

  public static enum(param, values) {
    return Joi.string().valid(values).optional()
      .error(createError(`Parameter ${param} must be one of: ${values.join(', ')}`));
  }

  public static array(param) {
    return Joi.array().allow(null)
      .error(createError(`Parameter ${param} must be an array`));
  }

  public static arrayOfStrings(param) {
    return Joi.array().items(Joi.string()).allow(null)
      .error(createError(`Parameter ${param} must be an array of strings`));
  }
}
