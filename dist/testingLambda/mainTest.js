"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
exports.default = (function (statusCode, data) {
    chai_1.expect(data.statusCode)
        .to.equal(statusCode);
});
//# sourceMappingURL=mainTest.js.map