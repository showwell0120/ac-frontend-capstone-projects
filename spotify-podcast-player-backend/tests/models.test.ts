import { prisma } from '../src/database'

test('user model', async () => {
  const user = await prisma.user.create({
    data: { id: 'someuniqueidaddusermodel' },
  })

  expect(user.createdAt).toBeDefined()
  await prisma.user.delete({ where: { id: user.id } })
})

test('userfavorite model', async () => {
  const user = await prisma.user.create({
    data: { id: 'someuniqueidadduserfave' },
  })

  const fave = await prisma.userFavorite.create({
    data: {
      userId: user.id,
      episodeId: 'some-episode-id',
    },
  })

  expect(fave.createdAt).toBeDefined()
  expect(fave.userId).toBe(user.id)

  await prisma.userFavorite.deleteMany({ where: { userId: user.id } })
  await prisma.user.delete({ where: { id: user.id } })
})

test('category model', async () => {
  const user = await prisma.user.create({
    data: { id: 'someuniqueid' },
  })

  const categoryName = 'Some category'

  const category = await prisma.category.create({
    data: {
      userId: user.id,
      name: categoryName,
    },
  })

  expect(category.createdAt).toBeDefined()
  expect(category.userId).toBe(user.id)
  expect(category.name).toBe(categoryName)

  await prisma.category.deleteMany({ where: { userId: user.id } })
  await prisma.user.delete({ where: { id: user.id } })
})

test('categoryshow model', async () => {
  const user = await prisma.user.create({
    data: { id: 'someuniqueid' },
  })

  const category = await prisma.category.create({
    data: {
      userId: user.id,
      name: 'Some Category',
    },
  })

  const showId = 'Some Show ID'

  const categoryShow = await prisma.categoryShow.create({
    data: {
      userId: user.id,
      categoryId: category.id,
      showId: showId,
    },
  })

  expect(categoryShow.createdAt).toBeDefined()
  expect(categoryShow.userId).toBe(user.id)
  expect(categoryShow.categoryId).toBe(category.id)
  expect(categoryShow.showId).toBe(showId)

  await prisma.categoryShow.deleteMany({ where: { userId: user.id } })
  await prisma.category.deleteMany({ where: { userId: user.id } })
  await prisma.user.delete({ where: { id: user.id } })
})
