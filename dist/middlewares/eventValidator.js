"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* attribution: https://github.com/keboola/middy-event-validator/blob/master/src/eventValidator.js */
var http_errors_1 = __importDefault(require("http-errors"));
var joi_1 = __importDefault(require("joi"));
var lodash_1 = __importDefault(require("lodash"));
// import constant from '../constants';
var utils_1 = require("../utils");
var buildSchema = function (def) {
    var body = lodash_1.default.get(def, 'body', {});
    var headers = lodash_1.default.get(def, 'headers', {});
    var path = lodash_1.default.get(def, 'path', {});
    var query = lodash_1.default.get(def, 'query', {});
    var res = {};
    if (lodash_1.default.size(body)) {
        res.body = joi_1.default.object().allow(null).keys(body);
    }
    if (lodash_1.default.size(headers)) {
        res.headers = joi_1.default.object().allow(null).keys(headers);
    }
    if (lodash_1.default.size(path)) {
        res.pathParameters = joi_1.default.object().allow(null).keys(path);
    }
    if (lodash_1.default.size(query)) {
        res.queryStringParameters = joi_1.default.object().allow(null).keys(query);
    }
    return res;
};
exports.default = (function (_a) {
    var schema = _a.schema;
    return ({
        before: function (handler) { return new Promise(function (resolve, reject) {
            var res = joi_1.default.validate(handler.event, buildSchema(schema), { allowUnknown: true, stripUnknown: true });
            if (res.error) {
                var message = 'invalid input';
                var statusCode = 422;
                return reject({ message: message, statusCode: statusCode });
            }
            return resolve();
        }); },
        onError: function (handler) {
            var _a = handler.error, message = _a.message, statusCode = _a.statusCode;
            var response = utils_1.jsonResponseUtils.failure({ message: message }, statusCode);
            return handler.callback(null, response);
        },
    });
});
var Validation = /** @class */ (function () {
    function Validation() {
    }
    Validation.getJoi = function () {
        return joi_1.default;
    };
    Validation.forbidden = function (param) {
        return joi_1.default.any().forbidden().error(http_errors_1.default("Setting of parameter " + param + " is forbidden"));
    };
    Validation.boolean = function (param) {
        return joi_1.default.boolean().optional()
            .error(http_errors_1.default("Parameter " + param + " must be a boolean"));
    };
    Validation.string = function (param) {
        return joi_1.default.string().optional().allow(null).trim()
            .error(http_errors_1.default("Parameter " + param + " must be a string"));
    };
    Validation.stringMaxLength = function (param, length) {
        return joi_1.default.string().max(length).optional().allow(null)
            .trim()
            .error(http_errors_1.default("Parameter " + param + " must be a string with max length of " + length));
    };
    Validation.integer = function (param) {
        return joi_1.default.number().integer().optional().allow(null)
            .error(http_errors_1.default("Parameter " + param + " must be an integer"));
    };
    Validation.object = function (param) {
        return joi_1.default.object().optional().allow(null)
            .error(http_errors_1.default("Parameter " + param + " must be an object"));
    };
    Validation.enum = function (param, values) {
        return joi_1.default.string().valid(values).optional()
            .error(http_errors_1.default("Parameter " + param + " must be one of: " + values.join(', ')));
    };
    Validation.array = function (param) {
        return joi_1.default.array().allow(null)
            .error(http_errors_1.default("Parameter " + param + " must be an array"));
    };
    Validation.arrayOfStrings = function (param) {
        return joi_1.default.array().items(joi_1.default.string()).allow(null)
            .error(http_errors_1.default("Parameter " + param + " must be an array of strings"));
    };
    return Validation;
}());
exports.Validation = Validation;
//# sourceMappingURL=eventValidator.js.map