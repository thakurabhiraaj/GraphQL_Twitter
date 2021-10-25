"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
const schema_1 = require("@nexus/schema");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const utils_1 = require("../utils");
exports.Mutation = (0, schema_1.mutationType)({
    definition(t) {
        t.field("signup", {
            type: "AuthPayload",
            args: {
                name: (0, schema_1.stringArg)(),
                email: (0, schema_1.stringArg)({ nullable: false }),
                password: (0, schema_1.stringArg)({ nullable: false })
            },
            resolve: async (_parent, { name, email, password }, ctx) => {
                const hashedPassword = await (0, bcryptjs_1.hash)(password, 10);
                const user = await ctx.prisma.user.create({
                    data: {
                        name,
                        email,
                        password: hashedPassword
                    }
                });
                return {
                    token: (0, jsonwebtoken_1.sign)({ userId: user.id }, utils_1.APP_SECRET),
                    user
                };
            }
        });
        t.field("login", {
            type: "AuthPayload",
            args: {
                email: (0, schema_1.stringArg)({ nullable: false }),
                password: (0, schema_1.stringArg)({ nullable: false })
            },
            resolve: async (_parent, { email, password }, ctx) => {
                const user = await ctx.prisma.user.findOne({
                    where: {
                        email
                    }
                });
                if (!user) {
                    throw new Error(`No user found for email: ${email}`);
                }
                const passwordValid = await (0, bcryptjs_1.compare)(password, user.password);
                if (!passwordValid) {
                    throw new Error("Invalid password");
                }
                return {
                    token: (0, jsonwebtoken_1.sign)({ userId: user.id }, utils_1.APP_SECRET),
                    user
                };
            }
        });
        t.field("createProfile", {
            type: "Profile",
            args: {
                bio: (0, schema_1.stringArg)(),
                location: (0, schema_1.stringArg)(),
                website: (0, schema_1.stringArg)(),
                avatar: (0, schema_1.stringArg)()
            },
            resolve: (parent, args, ctx) => {
                const userId = (0, utils_1.getUserId)(ctx);
                if (!userId)
                    throw new Error("Could not authenticate user.");
                return ctx.prisma.profile.create({
                    data: {
                        ...args,
                        User: { connect: { id: Number(userId) } }
                    }
                });
            }
        });
        t.field("updateProfile", {
            type: "Profile",
            args: {
                id: (0, schema_1.intArg)(),
                bio: (0, schema_1.stringArg)(),
                location: (0, schema_1.stringArg)(),
                website: (0, schema_1.stringArg)(),
                avatar: (0, schema_1.stringArg)()
            },
            resolve: (parent, { id, ...args }, ctx) => {
                const userId = (0, utils_1.getUserId)(ctx);
                if (!userId)
                    throw new Error("Could not authenticate user.");
                return ctx.prisma.profile.update({
                    data: {
                        ...args
                    },
                    where: {
                        id: Number(id)
                    }
                });
            }
        });
        t.field("createTweet", {
            type: "Tweet",
            args: {
                content: (0, schema_1.stringArg)()
            },
            resolve: (parent, { content }, ctx) => {
                const userId = (0, utils_1.getUserId)(ctx);
                if (!userId)
                    throw new Error("Could not authenticate user.");
                return ctx.prisma.tweet.create({
                    data: {
                        content,
                        author: { connect: { id: Number(userId) } }
                    }
                });
            }
        });
        t.field("likeTweet", {
            type: "LikedTweet",
            args: {
                id: (0, schema_1.intArg)()
            },
            resolve: (parent, { id }, ctx) => {
                const userId = (0, utils_1.getUserId)(ctx);
                if (!userId)
                    throw new Error("Could not authenticate user.");
                return ctx.prisma.likedTweet.create({
                    data: {
                        tweet: { connect: { id: Number(id) } },
                        User: { connect: { id: Number(userId) } }
                    }
                });
            }
        });
        t.field("deleteLike", {
            type: "LikedTweet",
            args: {
                id: (0, schema_1.intArg)({ nullable: false })
            },
            resolve: (parent, { id }, ctx) => {
                const userId = (0, utils_1.getUserId)(ctx);
                if (!userId)
                    throw new Error("Could not authenticate user.");
                return ctx.prisma.likedTweet.delete({
                    where: { id: id }
                });
            }
        });
        t.field("createComment", {
            type: "Comment",
            args: {
                content: (0, schema_1.stringArg)({ nullable: false }),
                id: (0, schema_1.intArg)({ nullable: false })
            },
            resolve: (parent, { content, id }, ctx) => {
                const userId = (0, utils_1.getUserId)(ctx);
                if (!userId)
                    throw new Error("Could not authenticate user.");
                return ctx.prisma.comment.create({
                    data: {
                        content,
                        User: { connect: { id: Number(userId) } },
                        Tweet: { connect: { id: Number(id) } }
                    }
                });
            }
        });
        t.field("createReply", {
            type: "Comment",
            args: {
                content: (0, schema_1.stringArg)({ nullable: false }),
                id: (0, schema_1.intArg)({ nullable: false }),
                commentId: (0, schema_1.intArg)()
            },
            resolve: (parent, { content, id, commentId }, ctx) => {
                const userId = (0, utils_1.getUserId)(ctx);
                if (!userId)
                    throw new Error("Could not authenticate user.");
                return ctx.prisma.comment.create({
                    data: {
                        content,
                        User: { connect: { id: Number(userId) } },
                        Tweet: { connect: { id: Number(id) } },
                        Comment: { connect: { id: Number(commentId) } }
                    }
                });
            }
        });
        t.field("follow", {
            type: "Following",
            args: {
                name: (0, schema_1.stringArg)({ nullable: false }),
                followId: (0, schema_1.intArg)({ nullable: false }),
                avatar: (0, schema_1.stringArg)({ nullable: false })
            },
            resolve: (parent, { name, followId, avatar }, ctx) => {
                const userId = (0, utils_1.getUserId)(ctx);
                if (!userId)
                    throw new Error("Could not authenticate user.");
                return ctx.prisma.following.create({
                    data: {
                        name,
                        avatar,
                        followId,
                        User: { connect: { id: Number(userId) } }
                    }
                });
            }
        });
        t.field("deleteFollow", {
            type: "Following",
            args: {
                id: (0, schema_1.intArg)({ nullable: false })
            },
            resolve: (parent, { id }, ctx) => {
                const userId = (0, utils_1.getUserId)(ctx);
                if (!userId)
                    throw new Error("Could not authenticate user.");
                return ctx.prisma.following.delete({
                    where: { id: id }
                });
            }
        });
    }
});
//# sourceMappingURL=Mutation.js.map