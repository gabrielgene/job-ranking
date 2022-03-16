import { DateTimeResolver } from 'graphql-scalars'
import { userMutations, userQueries, userResolvers } from './resolvers/user'
import { ratingMutations, ratingResolvers } from './resolvers/rating'

export const resolvers = {
  Query: {
    ...userQueries,
  },

  Mutation: {
    ...userMutations,
    ...ratingMutations,
  },

  User: {
    ...userResolvers,
  },
  Rating: {
    ...ratingResolvers,
  },
  DateTime: DateTimeResolver,
}
