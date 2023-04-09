import { generateAccessToken } from '../tokens'
import { prisma } from '../database'
//import getSpotifyProfile from './spotify'

const createUser = async (req, res) => {
  //const spotifyId = await getSpotifyProfile('hello')
  // TODO remove hardcoded spotifyId
  const spotifyId = 'helloworld1234'

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
    })

    // User not found, create a new record
    if (user === null) {
      user = await prisma.user.create({
        data: { id: spotifyId },
      })
    }

    // Generate a new token
    const token = generateAccessToken(user.id)

    res.send({
      id: user.id,
      token: token,
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
    savedEpisodes: user.favorites.map((f) => ({
      id: f.episodeId,
    })),
  })
}

export { createUser, me }
