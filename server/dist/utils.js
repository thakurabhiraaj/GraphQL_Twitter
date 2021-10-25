"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserId = exports.APP_SECRET = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
exports.APP_SECRET = 'appsecret321';
function getUserId(context) {
    const Authorization = context.request.get('Authorization');
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '');
        const verifiedToken = (0, jsonwebtoken_1.verify)(token, exports.APP_SECRET);
        return verifiedToken && verifiedToken.userId;
    }
}
exports.getUserId = getUserId;
//# sourceMappingURL=utils.js.map