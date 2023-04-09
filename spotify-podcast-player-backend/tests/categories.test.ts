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

test('add category', async () => {
  const user = await prisma.user.create({
    data: { id: 'someuniqueid' },
  })
  const authHeader = getAuthHeader(user.id)
  const data = { name: 'Category A' }

  let resp = await request(app)
    .post('/api/categories')
    .set('Authorization', authHeader)
    .send(data)
  expect(resp.status).toBe(200)
  expect(resp.body.success).toBe(true)

  resp = await request(app)
    .post('/api/categories')
    .set('Authorization', authHeader)
    .send(data)
  expect(resp.status).toBe(409)

  const count = await prisma.category.count({
    where: { userId: user.id },
  })
  expect(count).toBe(1)
})

test('delete category', async () => {
  const user = await prisma.user.create({
    data: { id: 'someuniqueid' },
  })
  const authHeader = getAuthHeader(user.id)
  const data = { name: 'category A' }

  const category = await prisma.category.create({
    data: { name: data.name, userId: user.id },
  })

  let resp = await request(app)
    .delete('/api/categories/' + category.id.toString())
    .set('Authorization', authHeader)
    .send(data)
  expect(resp.status).toBe(200)
  expect(resp.body.success).toBe(true)

  resp = await request(app)
    .delete('/api/categories/' + category.id.toString())
    .set('Authorization', authHeader)
    .send(data)
  expect(resp.status).toBe(404)

  const count = await prisma.category.count({
    where: { userId: user.id },
  })
  expect(count).toBe(0)
})

test('update category', async () => {
  const user = await prisma.user.create({
    data: { id: 'someuniqueid' },
  })
  const authHeader = getAuthHeader(user.id)
  const data = { name: 'category A' }

  const category = await prisma.category.create({
    data: { name: data.name, userId: user.id },
  })

  const category2 = await prisma.category.create({
    data: { name: 'category B', userId: user.id },
  })

  data['name'] = 'category C'
  let resp = await request(app)
    .put('/api/categories/' + category.id.toString())
    .set('Authorization', authHeader)
    .send(data)
  expect(resp.status).toBe(200)
  expect(resp.body.success).toBe(true)

  data['name'] = category2.name
  resp = await request(app)
    .put('/api/categories/' + category.id.toString())
    .set('Authorization', authHeader)
    .send(data)
  expect(resp.status).toBe(409)
})

test('list categories', async () => {
  const user = await prisma.user.create({
    data: { id: 'someuniqueid' },
  })
  const authHeader = getAuthHeader(user.id)

  let resp = await request(app)
    .get('/api/categories')
    .set('Authorization', authHeader)
    .send()
  expect(resp.status).toBe(200)
  expect(resp.body.categories).toHaveLength(0)

  const category = await prisma.category.create({
    data: { name: 'category A', userId: user.id },
  })

  const category2 = await prisma.category.create({
    data: { name: 'category B', userId: user.id },
  })

  resp = await request(app)
    .get('/api/categories')
    .set('Authorization', authHeader)
    .send()
  expect(resp.status).toBe(200)
  expect(resp.body.categories).toHaveLength(2)

  const ids = resp.body.categories.map((c) => c.id)
  expect(ids).toContain(category.id.toString())
  expect(ids).toContain(category2.id.toString())
})
