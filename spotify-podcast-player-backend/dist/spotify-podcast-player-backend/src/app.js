var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var app_exports = {};
__export(app_exports, {
  default: () => app_default
});
module.exports = __toCommonJS(app_exports);
var import_express = __toESM(require("express"));
var import_database = require("./database");
var import_middleware = require("./middleware");
var import_users = require("./routes/users");
var import_favorites = require("./routes/favorites");
var import_categories = require("./routes/categories");
var import_categoryShows = require("./routes/categoryShows");
const app = (0, import_express.default)();
app.use(import_express.default.json());
app.post("/api/users", import_users.createUser);
app.get("/api/me", import_middleware.authenticateJWT, import_users.me);
app.post("/api/episodes", import_middleware.authenticateJWT, import_favorites.addFavorite);
app.delete("/api/episodes/:episodeId", import_middleware.authenticateJWT, import_favorites.deleteFavorite);
app.get("/api/categories", import_middleware.authenticateJWT, import_categories.listCategories);
app.post("/api/categories", import_middleware.authenticateJWT, import_categories.addCategory);
app.put("/api/categories/:categoryId", import_middleware.authenticateJWT, import_categories.updateCategory);
app.delete("/api/categories/:categoryId", import_middleware.authenticateJWT, import_categories.deleteCategory);
app.post("/api/categories/:categoryId/shows", import_middleware.authenticateJWT, import_categoryShows.addCategoryShow);
app.delete(
  "/api/categories/:categoryId/shows/:showId",
  import_middleware.authenticateJWT,
  import_categoryShows.deleteCategoryShow
);
app.get("/", async (req, res) => {
  const users = await import_database.prisma.user.findMany({});
  res.send({ message: "Hello! Total " + users.length + " users" });
});
var app_default = app;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
