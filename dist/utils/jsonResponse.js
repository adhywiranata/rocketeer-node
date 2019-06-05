"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (statusCode, data, headers) {
    if (statusCode === void 0) { statusCode = 500; }
    if (headers === void 0) { headers = {}; }
    var result = {
        body: JSON.stringify(data),
        headers: Object.assign({
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': '*',
        }, headers),
        statusCode: statusCode,
    };
    return result;
});
//# sourceMappingURL=jsonResponse.js.map