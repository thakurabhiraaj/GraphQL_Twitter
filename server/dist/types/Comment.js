"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const schema_1 = require("@nexus/schema");
exports.Comment = (0, schema_1.objectType)({
    name: "Comment",
    definition(t) {
        t.model.id();
        t.model.content();
        t.model.createdAt();
        t.model.User();
        t.model.Comment();
        t.model.commentId();
    }
});
//# sourceMappingURL=Comment.js.map