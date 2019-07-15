"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __importDefault(require("../constants"));
var utils_1 = require("../utils");
exports.default = (function (apiKeyHeaderKey, apiKey) { return ({
    before: function (_a) {
        var event = _a.event;
        return new Promise(function (resolve, reject) {
            var isFromScheduledEvent = !!event.source && event.source === 'aws.events' || false;
            var isFromInvokedEvent = !!event.headers && event.headers[apiKeyHeaderKey] === apiKey || false;
            if (isFromScheduledEvent || isFromInvokedEvent) {
                return resolve();
            }
            var message = constants_1.default.RESPONSE_MESSAGE.INVALID_TOKEN;
            var statusCode = 401;
            return reject({ message: message, statusCode: statusCode });
        });
    },
    onError: function (handler) {
        var _a = handler.error, message = _a.message, statusCode = _a.statusCode;
        var response = utils_1.jsonResponseUtils.failure({ message: message }, statusCode);
        return handler.callback(null, response);
    },
}); });
//# sourceMappingURL=apiKeyAuthorizer.js.map