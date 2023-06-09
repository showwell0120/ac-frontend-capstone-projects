import request from 'supertest'
import { prisma } from '../src/database'
import app from '../src/app'
import { getAuthHeader } from './helpers'

test('add favorite', async () => {
  const user = await prisma.user.create({
    data: { id: 'someuniqueidaddfavorite' },
  })
  const authHeader = getAuthHeader(user.id)
  const data = { episodeId: 'episode123' }

  let resp = await request(app)
    .post('/api/episodes')
    .set('Authorization', authHeader)
    .send(data)
  expect(resp.status).toBe(200)
  expect(resp.body.success).toBe(true)

  resp = await request(app)
    .post('/api/episodes')
    .set('Authorization', authHeader)
    .send(data)
  expect(resp.status).toBe(409)

  resp = await request(app)
    .get('/api/me')
    .set('Authorization', authHeader)
    .send()
  expect(resp.body.favoriteEpisodeIds[0].id).toBe(data.episodeId)

  await prisma.userFavorite.deleteMany({ where: { userId: user.id } })
  await prisma.user.delete({ where: { id: user.id } })
})

test('delete favorite', async () => {
  const user = await prisma.user.create({
    data: { id: 'someuniqueiddeletefavorite' },
  })
  const authHeader = getAuthHeader(user.id)
  const data = { episodeId: 'episode123' }

  let resp = await request(app)
    .post('/api/episodes')
    .set('Authorization', authHeader)
    .send(data)
  expect(resp.status).toBe(200)
  expect(resp.body.success).toBe(true)

  resp = await request(app)
    .delete('/api/episodes/' + data.episodeId)
    .set('Authorization', authHeader)
    .send()
  expect(resp.status).toBe(200)
  expect(resp.body.success).toBe(true)

  resp = await request(app)
    .delete('/api/episodes/' + data.episodeId)
    .set('Authorization', authHeader)
    .send()
  expect(resp.status).toBe(404)

  resp = await request(app)
    .get('/api/me')
    .set('Authorization', authHeader)
    .send()
  expect(resp.body.favoriteEpisodeIds).toHaveLength(0)

  await prisma.user.delete({ where: { id: user.id } })
})
