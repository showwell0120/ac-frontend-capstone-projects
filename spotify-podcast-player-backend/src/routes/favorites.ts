import { prisma } from '../database'

const addFavorite = async (req, res) => {
  const count = await prisma.userFavorite.count({
    where: {
      userId: req.user.id,
      episodeId: req.body.episodeId,
    },
  })

  if (count === 0) {
    await prisma.userFavorite.create({
      data: {
        userId: req.user.id,
        episodeId: req.body.episodeId,
      },
    })
    res.send({ success: true })
  } else {
    res.sendStatus(409)
  }
}

const deleteFavorite = async (req, res) => {
  const count = await prisma.userFavorite.count({
    where: {
      user: req.user,
      episodeId: req.params.episodeId,
    },
  })

  if (count === 0) {
    res.sendStatus(404)
  } else {
    await prisma.userFavorite.deleteMany({
      where: {
        userId: req.user.id,
        episodeId: req.params.episodeId,
      },
    })
    res.send({ success: true })
  }
}

export { addFavorite, deleteFavorite }
