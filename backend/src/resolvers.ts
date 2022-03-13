import { DateTimeResolver } from 'graphql-scalars'
import { Context } from './context'
import { JuniorInput, JuniorUserInput } from './types'

export const resolvers = {
  Query: {
    allUsers: (_parent, _args, context: Context, x) => {
      return context.prisma.user.findMany({ where: { type: _args.type } })
    },
  },

  Mutation: {
    createJunior: async (
      _parent,
      args: { data: JuniorUserInput },
      context: Context,
    ) => {
      const { email, password, type, name, bio } = args.data

      const user = await context.prisma.user.create({
        data: {
          email,
          password,
          type,
        },
      })

      await context.prisma.junior.create({
        data: { userId: user.id, name, bio },
      })

      return user
    },
    login: async (_, args, context: Context) => {
      const { email, pass } = args

      const user = await context.prisma.user.findUnique({ where: { email } })
      if (!user) {
        throw new Error('invalid_email_or_pass')
      }
      if (user.password !== pass) {
        throw new Error('invalid_email_or_pass')
      }

      return {
        token: user.id,
        type: user.type,
      }
    },
  },

  DateTime: DateTimeResolver,
  User: {
    junior: (_parent, _args, context: Context) => {
      return context.prisma.junior.findUnique({
        where: { userId: _parent.id || undefined },
      })
    },
    company: (_parent, _args, context: Context) => {
      return context.prisma.company.findUnique({
        where: { userId: _parent.id || undefined },
      })
    },
    senior: (_parent, _args, context: Context) => {
      return context.prisma.senior.findUnique({
        where: { userId: _parent.id || undefined },
      })
    },
  },
}
