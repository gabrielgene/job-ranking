import { makeExecutableSchema } from '@graphql-tools/schema'
import { resolvers } from './resolvers'

const typeDefs = `

input CreateJuniorUserInput {
  email: String!
  password: String!
  type: String!
  name: String!
  bio: String!
}

type Mutation {
  createJunior(data: CreateJuniorUserInput!): User!
  login(email: String!, pass: String!): Auth
}

type Query {
  allUsers(type: String): [User!]!
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
  email: String!
  password: String
  type: String
  junior: Junior
  company: Company
  senior: Senior
}

type Junior {
  id: String!
  name: String
  bio: String
}

type Senior {
  id: Int!
  name: String
  bio: String
}

type Company {
  id: Int!
  name: String
  bio: String
  status: String
}


input UserUniqueInput {
  email: String
  id: Int
}

scalar DateTime
`

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})
