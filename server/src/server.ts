import { GraphQLServer } from 'graphql-yoga'
import { createContext } from './context'
import { permissions } from './permissions'
import { schema } from './schema'
import express from 'express'
const path = require('path')

const port = process.env.PORT || 4000

const server = new GraphQLServer({
  schema,
  context: createContext,
  middlewares: [permissions],
})

const buildPath = path.normalize(path.join(__dirname, '../../web/build'));

server.express.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/../../web/build/index.html'))
})
server.start({port: port}, () => console.log(`Server is running on localhost:${port}`))
// // Serve static files from the React frontend app
// app.use(express.static(path.join(__dirname, '../frontend/build')))

// // AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/../frontend/build/index.html'))
// })
