import { Context } from '../context'
import { UserInput } from '../types'

export const userQueries = {
  allUsers: (_parent, _args, context: Context) => {
    return context.prisma.user.findMany()
  },
  me: (_parent, _args, context: Context) => {
    return context.prisma.user.findUnique({ where: { id: context.userId } })
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
    const { email, password, type, name, bio } = args.data

    const user = await context.prisma.user.create({
      data: {
        email,
        password,
        type,
        name,
        bio,
      },
    })

    return user
  },
}

export const userResolvers = {
  ratings: (_parent, _args, context: Context) => {
    return context.prisma.rating.findMany({
      where: { userId: _parent.id || undefined },
    })
  },
}
