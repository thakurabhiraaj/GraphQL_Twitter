"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const schema_1 = require("@nexus/schema");
const utils_1 = require("../utils");
exports.Query = (0, schema_1.queryType)({
    definition(t) {
        t.field("me", {
            type: "User",
            nullable: true,
            resolve: (parent, args, ctx) => {
                const userId = (0, utils_1.getUserId)(ctx);
                return ctx.prisma.user.findOne({
                    where: {
                        id: Number(userId)
                    }
                });
            }
        });
        t.list.field("users", {
            type: "User",
            resolve: (parent, args, ctx) => {
                return ctx.prisma.user.findMany();
            }
        });
        t.list.field("tweets", {
            type: "Tweet",
            resolve: (parent, args, ctx) => {
                return ctx.prisma.tweet.findMany();
            }
        });
        t.field("tweet", {
            type: "Tweet",
            nullable: true,
            args: { id: (0, schema_1.intArg)() },
            resolve: (parent, { id }, ctx) => {
                return ctx.prisma.tweet.findOne({
                    where: {
                        id: Number(id)
                    }
                });
            }
        });
        t.field("user", {
            type: "User",
            nullable: true,
            args: { id: (0, schema_1.intArg)() },
            resolve: (parent, { id }, ctx) => {
                return ctx.prisma.user.findOne({
                    where: {
                        id: Number(id)
                    }
                });
            }
        });
    }
});
//# sourceMappingURL=Query.js.map