import { Context } from '../context'
import { RatingInput } from '../types'

export const ratingMutations = {
  createRating: async (_, args: { data: RatingInput }, context: Context) => {
    const { ownerId, userId, content, score } = args.data

    const rating = await context.prisma.rating.create({
      data: {
        ownerId,
        userId,
        content,
        score,
      },
    })

    return rating
  },
}

export const ratingResolvers = {
  owner: (_parent, _args, context: Context) => {
    return context.prisma.user.findUnique({
      where: { id: _parent.ownerId || undefined },
    })
  },
}
