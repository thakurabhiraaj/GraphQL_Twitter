"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Following = void 0;
const schema_1 = require("@nexus/schema");
exports.Following = (0, schema_1.objectType)({
    name: "Following",
    definition(t) {
        t.model.id();
        t.model.User();
        t.model.name();
        t.model.avatar();
        t.model.followId();
    }
});
//# sourceMappingURL=Following.js.map