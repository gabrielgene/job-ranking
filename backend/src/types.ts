export interface UserInput {
  email: string
  password: string
  type: string
  name: string
  bio: string
}

export interface RatingInput {
  ownerId: string
  userId: string
  content: string
  score: number
}
