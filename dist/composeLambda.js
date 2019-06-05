"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var middy_1 = __importDefault(require("middy"));
var middlewares_1 = require("middy/middlewares");
var middlewares_2 = require("./middlewares");
var defaultMiddlewares = [
    middlewares_1.doNotWaitForEmptyEventLoop({ runOnError: true }),
    middlewares_1.jsonBodyParser(),
    middlewares_1.httpEventNormalizer(),
    middlewares_1.httpHeaderNormalizer(),
    middlewares_1.httpSecurityHeaders(),
    middlewares_1.httpErrorHandler(),
];
var defaultOptions = {
    applyWarmer: false,
};
var applyMiddleware = function (handler, middleware) {
    return handler.use(middleware);
};
var lambda = function (handlerFunc, middlewares, options) {
    if (middlewares === void 0) { middlewares = []; }
    if (options === void 0) { options = defaultOptions; }
    return __spread(defaultMiddlewares, middlewares, [
        options.applyWarmer ? middlewares_2.warmerInterceptorMiddleware() : middlewares_2.noopMiddleware(),
    ]).reduce(applyMiddleware, middy_1.default(handlerFunc));
};
exports.lambda = lambda;
//# sourceMappingURL=composeLambda.js.map