"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buildResponse = function (_a) {
    var _b = _a.statusCode, statusCode = _b === void 0 ? 500 : _b, data = _a.data, _c = _a.headers, headers = _c === void 0 ? {} : _c;
    var result = {
        body: JSON.stringify(data),
        headers: Object.assign({
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': '*',
        }, headers),
        statusCode: statusCode,
    };
    return result;
};
exports.default = {
    errors: function (error) {
        var statusCode = error.statusCode || 500;
        if (error.response) {
            return buildResponse({ statusCode: statusCode, data: error.response.data.error_messages });
        }
        return buildResponse({ statusCode: statusCode, data: error.message });
    },
    failure: function (data, statusCode) {
        if (statusCode === void 0) { statusCode = 500; }
        return buildResponse({ statusCode: statusCode, data: data });
    },
    success: function (data) { return buildResponse({ statusCode: 200, data: data }); },
};
//# sourceMappingURL=jsonResponse.js.map