import { prisma } from '../src/database'


afterEach(async () => {
  await prisma.userFavorite.deleteMany({})
  await prisma.categoryShow.deleteMany({})
  await prisma.category.deleteMany({})
  await prisma.user.deleteMany({})
});


test('user model', async () => {
  let users = await prisma.user.findMany({})
  expect(users.length).toBe(0)

  const user = await prisma.user.create({
    data: { id: 'someuniqueid' },
  })

  expect(user.createdAt).toBeDefined()
});

test('userfavorite model', async () => {
  let user = await prisma.user.create({
    data: { id: 'someuniqueid' },
  })

  const fave = await prisma.userFavorite.create({
    data: {
      userId: user.id,
      episodeId: "some-episode-id"
    }
  })

  expect(fave.createdAt).toBeDefined()
  expect(fave.userId).toBe(user.id)
});

test('category model', async () => {
  const user = await prisma.user.create({
    data: { id: 'someuniqueid' },
  })

  const categoryName = "Some category"

  const category = await prisma.category.create({
    data: {
      userId: user.id,
      name: categoryName
    }
  })

  expect(category.createdAt).toBeDefined()
  expect(category.userId).toBe(user.id)
  expect(category.name).toBe(categoryName)
});

test('categoryshow model', async () => {
  const user = await prisma.user.create({
    data: { id: 'someuniqueid' },
  })

  const category = await prisma.category.create({
    data: {
      userId: user.id,
      name: "Some Category"
    }
  })

  const showId = "Some Show ID"

  const categoryShow = await prisma.categoryShow.create({
    data: {
      userId: user.id,
      categoryId: category.id,
      showId: showId
    }
  })

  expect(categoryShow.createdAt).toBeDefined()
  expect(categoryShow.userId).toBe(user.id)
  expect(categoryShow.categoryId).toBe(category.id)
  expect(categoryShow.showId).toBe(showId)
});
