"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_yoga_1 = require("graphql-yoga");
const context_1 = require("./context");
const permissions_1 = require("./permissions");
const schema_1 = require("./schema");
const express_1 = __importDefault(require("express"));
const path = require('path');
const port = process.env.PORT || 4000;
const server = new graphql_yoga_1.GraphQLServer({
    schema: schema_1.schema,
    context: context_1.createContext,
    middlewares: [permissions_1.permissions],
});
const buildPath = path.normalize(path.join(__dirname, '../../web/build'));
server.express.use('/uploads', express_1.default.static(path.join(buildPath)));
server.express.get('/build', (req, res) => {
    res.sendFile(path.join(__dirname + '/../../web/build/index.html'));
});
server.start({ port }, () => console.log(`Server is running on localhost:${port}`));
// // Serve static files from the React frontend app
// app.use(express.static(path.join(__dirname, '../frontend/build')))
// // AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/../frontend/build/index.html'))
// })
//# sourceMappingURL=server.js.map