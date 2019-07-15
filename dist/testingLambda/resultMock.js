"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apiGatewayProxyResultMock = function (payload) { return ({
    body: payload.body || '{}',
    headers: payload.headers || undefined,
    statusCode: payload.statusCode,
}); };
exports.default = apiGatewayProxyResultMock;
//# sourceMappingURL=resultMock.js.map