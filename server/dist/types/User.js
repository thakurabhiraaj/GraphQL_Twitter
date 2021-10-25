"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const schema_1 = require("@nexus/schema");
exports.User = (0, schema_1.objectType)({
    name: "User",
    definition(t) {
        t.model.id();
        t.model.name();
        t.model.email();
        t.model.tweets({ pagination: false });
        t.model.Profile();
        t.model.likedTweet();
        t.model.comments();
        t.model.Following();
    }
});
//# sourceMappingURL=User.js.map