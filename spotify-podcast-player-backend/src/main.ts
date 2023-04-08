import express from 'express';
import { prisma } from './database';
import { generateAccessToken, verifyAccessToken } from './tokens';
import getSpotifyProfile from './spotify';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const app = express();
app.use(express.json());

/*
 * JWT Middleware
 */
const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  req.user = null;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const userId = verifyAccessToken(token);
    console.log(userId);
    if (userId !== null) {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (user !== null) {
        req.user = user;
        return next();
      }
    }
  }

  res.sendStatus(403);
  return;
};

/*
 * User APIs
 */
app.post('/api/users', async (req, res) => {
  //const spotifyId = await getSpotifyProfile('hello')
  // TODO remove hardcoded spotifyId
  const spotifyId = 'helloworld1234';

  if (spotifyId === null) {
    res.send({
      message: 'Unable to fetch Spotify user profile, access token is invalid',
    });
  } else {
    // Check if user with Spotify ID already exists
    let user = await prisma.user.findUnique({
      where: {
        id: spotifyId,
      },
    });

    // User not found, create a new record
    if (user === null) {
      user = await prisma.user.create({
        data: { id: spotifyId },
      });
    }

    // Generate a new token
    const token = generateAccessToken(user.id);

    res.send({
      id: user.id,
      token: token,
    });
  }
});

app.get('/api/me', authenticateJWT, async (req, res) => {
  res.send({
    id: req.user.id,
    // TODO Fetch actual episodes
    savedEpisodes: [],
  });
});

/*
 * Favorite APIs
 */

app.post('/api/episodes', authenticateJWT, async (req, res) => {
  const count = await prisma.userFavorite.count({
    where: {
      userId: req.user.id,
      episodeId: req.body.episodeId,
    },
  });

  if (count === 0) {
    await prisma.userFavorite.create({
      data: {
        userId: req.user.id,
        episodeId: req.body.episodeId,
      },
    });
    res.send({ success: true });
  } else {
    res.sendStatus(409);
  }
});

app.delete('/api/episodes/:episodeId', authenticateJWT, async (req, res) => {
  const count = await prisma.userFavorite.count({
    where: {
      user: req.user,
      episodeId: req.params.episodeId,
    },
  });

  if (count === 0) {
    res.sendStatus(404);
  } else {
    await prisma.userFavorite.deleteMany({
      where: {
        userId: req.user.id,
        episodeId: req.params.episodeId,
      },
    });
    res.send({ success: true });
  }
});

app.get('/', async (req, res) => {
  const users = await prisma.user.findMany({});
  res.send({ message: 'Hello! Total ' + users.length + ' users' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
