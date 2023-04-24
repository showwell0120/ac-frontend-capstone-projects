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
var favorites_exports = {};
__export(favorites_exports, {
  addFavorite: () => addFavorite,
  deleteFavorite: () => deleteFavorite
});
module.exports = __toCommonJS(favorites_exports);
var import_database = require("../database");
const addFavorite = async (req, res) => {
  const count = await import_database.prisma.userFavorite.count({
    where: {
      userId: req.user.id,
      episodeId: req.body.episodeId
    }
  });
  if (count === 0) {
    await import_database.prisma.userFavorite.create({
      data: {
        userId: req.user.id,
        episodeId: req.body.episodeId
      }
    });
    res.send({ success: true });
  } else {
    res.sendStatus(409);
  }
};
const deleteFavorite = async (req, res) => {
  const count = await import_database.prisma.userFavorite.count({
    where: {
      user: req.user,
      episodeId: req.params.episodeId
    }
  });
  if (count === 0) {
    res.sendStatus(404);
  } else {
    await import_database.prisma.userFavorite.deleteMany({
      where: {
        userId: req.user.id,
        episodeId: req.params.episodeId
      }
    });
    res.send({ success: true });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addFavorite,
  deleteFavorite
});
