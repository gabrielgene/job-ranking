import { Context } from '../context'
import { UserInput } from '../types'

export const userQueries = {
  users: (_parent, _args, context: Context) => {
    return context.prisma.user.findMany()
  },
  juniors: async (_parent, _args, context: Context) => {
    const user = await context.prisma.user.findUnique({
      where: { id: context.userId },
    })
    if (!user) {
      throw new Error('user_unlogged')
    }
    return context.prisma.user.findMany({
      where: { occupation: user.occupation, type: 'JUNIOR' },
    })
  },
  me: (_parent, _args, context: Context) => {
    return context.prisma.user.findUnique({ where: { id: context.userId } })
  },
  user: (_parent, _args, context: Context) => {
    return context.prisma.user.findUnique({ where: { id: _args.userId } })
  },
}

export const userMutations = {
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
  createUser: async (_, args: { data: UserInput }, context: Context) => {
    const { data } = args

    const user = await context.prisma.user.create({
      data,
    })

    return user
  },
}

export const userResolvers = {
  ratings: (_parent, _args, context: Context) => {
    if (_parent.type === 'SENIOR') {
      return context.prisma.rating.findMany({
        where: { ownerId: _parent.id || undefined },
      })
    }
    if (_parent.type === 'JUNIOR') {
      return context.prisma.rating.findMany({
        where: { userId: _parent.id || undefined },
      })
    }
    return []
  },
  preferences: (_parent, _args, context: Context) => {
    return context.prisma.preferences.findMany({
      where: { userId: _parent.id || undefined },
    })
  },
}
