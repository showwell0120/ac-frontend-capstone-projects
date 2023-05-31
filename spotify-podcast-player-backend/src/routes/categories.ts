import { prisma } from '../database'

const addCategory = async (req, res) => {
  const count = await prisma.category.count({
    where: {
      userId: req.user.id,
      name: req.body.name,
    },
  })

  if (count === 0) {
    await prisma.category.create({
      data: {
        userId: req.user.id,
        name: req.body.name,
      },
    })
    res.send({ success: true })
  } else {
    res.sendStatus(409)
  }
}

const updateCategory = async (req, res) => {
  const category = await prisma.category.findUnique({
    where: {
      id: parseInt(req.params.categoryId),
    },
  })

  if (category === null) {
    res.sendStatus(404)
  } else if (category.userId != req.user.id) {
    res.sendStatus(403)
  } else {
    const count = await prisma.category.count({
      where: {
        name: req.body.name,
        NOT: {
          id: category.id,
        },
      },
    })

    if (count === 0) {
      await prisma.category.update({
        where: {
          id: category.id,
        },
        data: {
          name: req.body.name,
        },
      })
      res.send({ success: true })
    } else {
      res.sendStatus(409)
    }
  }
}

const deleteCategory = async (req, res) => {
  const category = await prisma.category.findUnique({
    where: {
      id: parseInt(req.params.categoryId),
    },
  })

  if (category === null) {
    res.sendStatus(404)
  } else {
    await prisma.categoryShow.deleteMany({
      where: {
        userId: req.user.id,
        categoryId: category.id,
      },
    })

    await prisma.category.delete({
      where: {
        id: category.id,
      },
    })
    res.send({ success: true })
  }
}

const listCategories = async (req, res) => {
  const categories = await prisma.category.findMany({
    where: {
      userId: req.user.id,
    },
    include: {
      shows: true,
    },
  })

  res.send({
    categories: categories.map((c) => ({
      id: c.id.toString(),
      name: c.name,
      savedShows: c.shows.map((s) => ({
        id: s.showId,
      })),
    })),
  })
}

export { addCategory, updateCategory, deleteCategory, listCategories }
