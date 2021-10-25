"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikedTweet = void 0;
const schema_1 = require("@nexus/schema");
exports.LikedTweet = (0, schema_1.objectType)({
    name: "LikedTweet",
    definition(t) {
        t.model.id();
        t.model.tweet();
        t.model.likedAt();
    }
});
//# sourceMappingURL=LikedTweet.js.map