import { prisma } from '../database'

const addCategoryShow = async (req, res) => {
  const categoryId = parseInt(req.params.categoryId);
  const userId = req.user.id;
  const showId = req.body.showId;
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (category === null) {
      return res.sendStatus(404);
    } else if (category.userId !== userId) {
      return res.sendStatus(403);
    } 
  
    await prisma.categoryShow.create({
      data: {
        userId,
        categoryId,
        showId,
      },
    });
    res.send({ success: true });
  } catch (error) {
    if (error.code === 'P2002') { // Prisma unique constraint violation error code
      res.sendStatus(409);
    } else {
      res.sendStatus(500);
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
