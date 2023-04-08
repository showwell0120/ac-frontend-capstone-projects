import { prisma } from '../database'

const addCategoryShow = async (req, res) => {
  const category = await prisma.category.findUnique({
    where: {
      id: parseInt(req.params.categoryId),
    },
  })

  if (category === null) {
    res.sendStatus(404)
  } else if (category.userId !== req.user.id) {
    res.sendStatus(403)
  } else {
    const count = await prisma.categoryShow.count({
      where: {
        userId: category.userId,
        categoryId: category.id,
        showId: req.body.showId,
      },
    })

    if (count === 0) {
      await prisma.categoryShow.create({
        data: {
          userId: category.userId,
          categoryId: category.id,
          showId: req.body.showId,
        },
      })
      res.send({ success: true })
    } else {
      res.sendStatus(409)
    }
  }
}

const deleteCategoryShow = async (req, res) => {
  const count = await prisma.categoryShow.count({
    where: {
      showId: req.params.showId,
      userId: req.user.id,
      categoryId: parseInt(req.params.categoryId),
    },
  })

  if (count === 0) {
    res.sendStatus(404)
  } else {
    await prisma.categoryShow.deleteMany({
      where: {
        showId: req.params.showId,
        userId: req.user.id,
        categoryId: parseInt(req.params.categoryId),
      },
    })
    res.send({ success: true })
  }
}

export { addCategoryShow, deleteCategoryShow }
