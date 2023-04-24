import { generateAccessToken } from '../tokens'
import { prisma } from '../database'
import getSpotifyProfile from '../spotify'

const createUser = async (req, res) => {
  const spotifyId = await getSpotifyProfile(req.body.spotifyToken)
  //const spotifyId = req.body.spotifyToken

  if (spotifyId === null) {
    res.send({
      message: 'Unable to fetch Spotify user profile, access token is invalid',
    })
  } else {
    // Check if user with Spotify ID already exists
    let user = await prisma.user.findUnique({
      where: {
        id: spotifyId,
      },
      include: {
        favorites: true,
      },
    })

    // User not found, create a new record
    if (user === null) {
      user = await prisma.user.create({
        data: { id: spotifyId },
        include: {
          favorites: true,
        },
      })
    }

    // Generate a new token
    const token = generateAccessToken(user.id)

    res.send({
      id: user.id,
      token: token,
      favoriteEpisodeIds: user.favorites.map((f) => ({
        id: f.episodeId,
      })),
    })
  }
}

const me = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      favorites: true,
    },
  })

  res.send({
    id: req.user.id,
    favoriteEpisodeIds: user.favorites.map((f) => ({
      id: f.episodeId,
    })),
  })
}

export { createUser, me }
