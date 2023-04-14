var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var categoryShows_exports = {};
__export(categoryShows_exports, {
  addCategoryShow: () => addCategoryShow,
  deleteCategoryShow: () => deleteCategoryShow
});
module.exports = __toCommonJS(categoryShows_exports);
var import_database = require("../database");
const addCategoryShow = async (req, res) => {
  const category = await import_database.prisma.category.findUnique({
    where: {
      id: parseInt(req.params.categoryId)
    }
  });
  if (category === null) {
    res.sendStatus(404);
  } else if (category.userId !== req.user.id) {
    res.sendStatus(403);
  } else {
    const count = await import_database.prisma.categoryShow.count({
      where: {
        userId: category.userId,
        categoryId: category.id,
        showId: req.body.showId
      }
    });
    if (count === 0) {
      await import_database.prisma.categoryShow.create({
        data: {
          userId: category.userId,
          categoryId: category.id,
          showId: req.body.showId
        }
      });
      res.send({ success: true });
    } else {
      res.sendStatus(409);
    }
  }
};
const deleteCategoryShow = async (req, res) => {
  const count = await import_database.prisma.categoryShow.count({
    where: {
      showId: req.params.showId,
      userId: req.user.id,
      categoryId: parseInt(req.params.categoryId)
    }
  });
  if (count === 0) {
    res.sendStatus(404);
  } else {
    await import_database.prisma.categoryShow.deleteMany({
      where: {
        showId: req.params.showId,
        userId: req.user.id,
        categoryId: parseInt(req.params.categoryId)
      }
    });
    res.send({ success: true });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addCategoryShow,
  deleteCategoryShow
});
