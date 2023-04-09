import request from 'supertest'
import { prisma } from '../src/database'
import app from '../src/app'
import { getAuthHeader } from './helpers'

afterEach(async () => {
  await prisma.userFavorite.deleteMany({})
  await prisma.categoryShow.deleteMany({})
  await prisma.category.deleteMany({})
  await prisma.user.deleteMany({})
})

test('add categoryShow', async () => {
  const user = await prisma.user.create({
    data: { id: 'someuniqueid' },
  })
  const authHeader = getAuthHeader(user.id)
  const category = await prisma.category.create({
    data: { name: 'category A', userId: user.id },
  })

  const data = { showId: 'showId1234' }

  let resp = await request(app)
    .post('/api/categories/' + category.id.toString() + '/shows')
    .set('Authorization', authHeader)
    .send(data)
  expect(resp.status).toBe(200)
  expect(resp.body.success).toBe(true)

  resp = await request(app)
    .post('/api/categories/' + category.id.toString() + '/shows')
    .set('Authorization', authHeader)
    .send(data)
  expect(resp.status).toBe(409)

  resp = await request(app)
    .get('/api/categories')
    .set('Authorization', authHeader)
    .send()
  expect(resp.status).toBe(200)
  expect(resp.body.categories[0].savedShows[0].id).toBe(data.showId)
})

test('delete category', async () => {
  const user = await prisma.user.create({
    data: { id: 'someuniqueid' },
  })
  const authHeader = getAuthHeader(user.id)
  const category = await prisma.category.create({
    data: { name: 'category A', userId: user.id },
  })

  const categoryShow = await prisma.categoryShow.create({
    data: { showId: 'showId1234', categoryId: category.id, userId: user.id },
  })

  let resp = await request(app)
    .delete(
      '/api/categories/' +
        category.id.toString() +
        '/shows/' +
        categoryShow.showId
    )
    .set('Authorization', authHeader)
    .send()
  expect(resp.status).toBe(200)
  expect(resp.body.success).toBe(true)

  resp = await request(app)
    .delete(
      '/api/categories/' +
        category.id.toString() +
        '/shows/' +
        categoryShow.showId
    )
    .set('Authorization', authHeader)
    .send()
  expect(resp.status).toBe(404)
})
