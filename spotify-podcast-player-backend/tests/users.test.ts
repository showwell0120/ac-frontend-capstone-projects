import request from 'supertest'
import app from '../src/app'
import { prisma } from '../src/database'
import { getAuthHeader } from './helpers'

import axios from 'axios'
import getSpotifyProfile from '../src/spotify'


test('create user', async () => {
  const spotifyId = 'someuniqueidadduser'

  axios.get = jest.fn()
  const mockResp = {data: {id: spotifyId}};
  (axios.get as jest.Mock).mockResolvedValue(mockResp)

  const resp = await request(app)
    .post('/api/users')
    .send({ spotifyToken: spotifyId })
  expect(resp.status).toBe(200)
  expect(resp.body.token).toBeDefined()
  expect(resp.body.favoriteEpisodeIds).toHaveLength(0)

  await prisma.user.delete({ where: { id: spotifyId } })
})

test('me', async () => {
  const user = await prisma.user.create({
    data: { id: 'someuniqueidme' },
  })
  const authHeader = getAuthHeader(user.id)

  const resp = await request(app)
    .get('/api/me')
    .set('Authorization', authHeader)
    .send()
  expect(resp.status).toBe(200)
  expect(resp.body.id).toBe(user.id)
  expect(resp.body.favoriteEpisodeIds).toHaveLength(0)

  await prisma.user.delete({ where: { id: user.id } })
})
