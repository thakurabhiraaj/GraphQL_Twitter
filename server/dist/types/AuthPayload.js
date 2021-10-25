"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthPayload = void 0;
const schema_1 = require("@nexus/schema");
exports.AuthPayload = (0, schema_1.objectType)({
    name: 'AuthPayload',
    definition(t) {
        t.string('token');
        t.field('user', { type: 'User' });
    },
});
//# sourceMappingURL=AuthPayload.js.map