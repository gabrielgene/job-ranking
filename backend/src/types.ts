export interface UserInput {
  email: string
  password: string
  type: string
  name: string
  username: string
  bio: string
  occupation: string
  preferences: string[]
}

export interface RatingInput {
  ownerId: string
  userId: string
  content: string
  score: number
}
