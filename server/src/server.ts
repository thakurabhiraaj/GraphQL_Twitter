import { GraphQLServer } from 'graphql-yoga'
import { createContext } from './context'
import { permissions } from './permissions'
import { schema } from './schema'

const port = process.env.PORT || 4000

new GraphQLServer({
  schema,
  context: createContext,
  middlewares: [permissions],
}).start({ port: port }, () =>
  console.log(`🚀 Server ready at: http://localhost:${port}`),
)
