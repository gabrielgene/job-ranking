import * as express from 'express'

import { graphqlHTTP } from 'express-graphql'
import { schema } from './schema'
import { createContext } from './context'

const app = express()

app.use(
  '/graphql',
  graphqlHTTP((req) => ({
    schema,
    context: createContext(req),
    graphiql: true,
  })),
)

app.listen(4000)
console.log(`\
🚀 Server ready at: http://localhost:4000/graphql
⭐️ See sample queries: http://pris.ly/e/ts/graphql-express-sdl-first#using-the-graphql-api
`)
