"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const schema_1 = require("@nexus/schema");
exports.Profile = (0, schema_1.objectType)({
    name: 'Profile',
    definition(t) {
        t.model.id();
        t.model.bio();
        t.model.location();
        t.model.website();
        t.model.avatar();
    },
});
//# sourceMappingURL=Profile.js.map