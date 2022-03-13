import jwt from 'jsonwebtoken'

const SECRET = 'JOBS_SECRET'

type Payload = {
  id: string
}

export function generateToken(userId: string) {
  return jwt.sign({ id: userId }, SECRET)
}

export function decodeToken(token: string) {
  return 'mytoken'
  return jwt.verify(token, SECRET, (err, decoded) => {
    if (err) throw err
    const { id } = decoded as Payload
    return id
  })
}
