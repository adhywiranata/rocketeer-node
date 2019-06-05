"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __importDefault(require("../constants"));
var utils_1 = __importDefault(require("../utils"));
exports.default = (function (apiKey, apiKeyHeaderKey) { return ({
    before: function (handler) { return new Promise(function (resolve, reject) {
        if (handler.event.headers[apiKeyHeaderKey || 'Api-App-Key'] === apiKey) {
            return resolve();
        }
        var message = constants_1.default.RESPONSE_MESSAGE.INVALID_TOKEN;
        var statusCode = 401;
        return reject({ message: message, statusCode: statusCode });
    }); },
    onError: function (handler) {
        var _a = handler.error, message = _a.message, statusCode = _a.statusCode;
        var response = utils_1.default.JSON_RESPONSE(statusCode, { message: message });
        return handler.callback(null, response);
    },
}); });
//# sourceMappingURL=apiKeyAuthorizer.js.map