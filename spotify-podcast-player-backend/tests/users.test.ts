import request from 'supertest'
import app from '../src/app'
import { prisma } from '../src/database'
import { getAuthHeader } from './helpers'

afterEach(async () => {
  await prisma.userFavorite.deleteMany({})
  await prisma.categoryShow.deleteMany({})
  await prisma.category.deleteMany({})
  await prisma.user.deleteMany({})
})

test('create user', async () => {
  const resp = await request(app)
    .post('/api/users')
    .send({ id: 'someuniqueid' })
  expect(resp.status).toBe(200)
  expect(resp.body.token).toBeDefined()
})

test('me', async () => {
  const user = await prisma.user.create({
    data: { id: 'someuniqueid' },
  })
  const authHeader = getAuthHeader(user.id)

  const resp = await request(app)
    .get('/api/me')
    .set('Authorization', authHeader)
    .send()
  expect(resp.status).toBe(200)
  expect(resp.body.id).toBe(user.id)
  expect(resp.body.savedEpisodes).toHaveLength(0)
})
