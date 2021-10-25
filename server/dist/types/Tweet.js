"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tweet = void 0;
const schema_1 = require("@nexus/schema");
exports.Tweet = (0, schema_1.objectType)({
    name: "Tweet",
    definition(t) {
        t.model.id();
        t.model.content();
        t.model.author();
        t.model.createdAt();
        t.model.likes();
        t.model.comments();
    }
});
//# sourceMappingURL=Tweet.js.map