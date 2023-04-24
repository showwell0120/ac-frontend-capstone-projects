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
var categories_exports = {};
__export(categories_exports, {
  addCategory: () => addCategory,
  deleteCategory: () => deleteCategory,
  listCategories: () => listCategories,
  updateCategory: () => updateCategory
});
module.exports = __toCommonJS(categories_exports);
var import_database = require("../database");
const addCategory = async (req, res) => {
  const count = await import_database.prisma.category.count({
    where: {
      userId: req.user.id,
      name: req.body.name
    }
  });
  if (count === 0) {
    await import_database.prisma.category.create({
      data: {
        userId: req.user.id,
        name: req.body.name
      }
    });
    res.send({ success: true });
  } else {
    res.sendStatus(409);
  }
};
const updateCategory = async (req, res) => {
  const category = await import_database.prisma.category.findUnique({
    where: {
      id: parseInt(req.params.categoryId)
    }
  });
  if (category === null) {
    res.sendStatus(404);
  } else if (category.userId != req.user.id) {
    res.sendStatus(403);
  } else {
    const count = await import_database.prisma.category.count({
      where: {
        name: req.body.name,
        NOT: {
          id: category.id
        }
      }
    });
    if (count === 0) {
      await import_database.prisma.category.update({
        where: {
          id: category.id
        },
        data: {
          name: req.body.name
        }
      });
      res.send({ success: true });
    } else {
      res.sendStatus(409);
    }
  }
};
const deleteCategory = async (req, res) => {
  const category = await import_database.prisma.category.findUnique({
    where: {
      id: parseInt(req.params.categoryId)
    }
  });
  if (category === null) {
    res.sendStatus(404);
  } else {
    await import_database.prisma.category.delete({
      where: {
        id: category.id
      }
    });
    res.send({ success: true });
  }
};
const listCategories = async (req, res) => {
  const categories = await import_database.prisma.category.findMany({
    where: {
      userId: req.user.id
    },
    include: {
      shows: true
    }
  });
  res.send({
    categories: categories.map((c) => ({
      id: c.id.toString(),
      name: c.name,
      savedShows: c.shows.map((s) => ({
        id: s.showId
      }))
    }))
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addCategory,
  deleteCategory,
  listCategories,
  updateCategory
});
