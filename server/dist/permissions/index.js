"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissions = void 0;
const graphql_shield_1 = require("graphql-shield");
const utils_1 = require("../utils");
const rules = {
    isAuthenticatedUser: (0, graphql_shield_1.rule)()((parent, args, context) => {
        const userId = (0, utils_1.getUserId)(context);
        return Boolean(userId);
    }),
    isPostOwner: (0, graphql_shield_1.rule)()(async (parent, { id }, context) => {
        const userId = (0, utils_1.getUserId)(context);
        const author = await context.prisma.tweet
            .findOne({
            where: {
                id: Number(id),
            },
        })
            .author();
        return userId === author.id;
    }),
};
exports.permissions = (0, graphql_shield_1.shield)({
    Query: {
        me: rules.isAuthenticatedUser,
        // filterPosts: rules.isAuthenticatedUser,
        tweet: rules.isAuthenticatedUser,
    },
    Mutation: {
    // createDraft: rules.isAuthenticatedUser,
    // deletePost: rules.isPostOwner,
    // publish: rules.isPostOwner,
    },
});
//# sourceMappingURL=index.js.map