import { verifyAccessToken } from './tokens'
import { prisma } from './database'

const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization
  req.user = null

  if (authHeader) {
    const token = authHeader.split(' ')[1]

    const userId = verifyAccessToken(token)
    if (userId !== null) {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      })

      if (user !== null) {
        req.user = user
        return next()
      }
    }
  }

  res.sendStatus(403)
  return
}

export { authenticateJWT }
