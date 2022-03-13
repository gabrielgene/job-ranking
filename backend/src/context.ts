import { PrismaClient } from '@prisma/client'
import { decodeToken } from './utils/auth'

export interface Context {
  prisma?: PrismaClient
  userId: any
}

const prisma = new PrismaClient()

export function user(req) {
  const token = req.headers.authorization || 'foi'
  let userId
  if (token) {
    userId = decodeToken(token)
  }
  return userId
}

export const createContext = (req): Context => ({
  prisma,
  userId: user(req),
})
