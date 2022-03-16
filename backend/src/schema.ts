import { makeExecutableSchema } from '@graphql-tools/schema'
import { resolvers } from './resolvers'

const typeDefs = `

input CreateUserInput {
  email: String!
  password: String!
  type: String!
  name: String!
  bio: String!
}

input CreateRatingInput {
  ownerId: String!
  userId: String!
  content: String!
  score: Int!
}

type Mutation {
  login(email: String!, pass: String!): Auth
  createRating(data: CreateRatingInput!): Rating!
  createUser(data: CreateUserInput!): User!
}

type Query {
  allUsers: [User!]!
  me: User
}

enum SortOrder {
  asc
  desc
}

type Auth {
  token: String
  type: String
}

type User {
  id: String
  email: String
  password: String
  type: String
  name: String
  bio: String
  ratings: [Rating]
}

type Rating {
  id: String
  content: String
  score: Int
  owner: User
}

scalar DateTime
`

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})
