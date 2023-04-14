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
var users_exports = {};
__export(users_exports, {
  createUser: () => createUser,
  me: () => me
});
module.exports = __toCommonJS(users_exports);
var import_tokens = require("../tokens");
var import_database = require("../database");
var import_spotify = __toESM(require("../spotify"));
const createUser = async (req, res) => {
  const spotifyId = await (0, import_spotify.default)(req.body.spotifyToken);
  if (spotifyId === null) {
    res.send({
      message: "Unable to fetch Spotify user profile, access token is invalid"
    });
  } else {
    let user = await import_database.prisma.user.findUnique({
      where: {
        id: spotifyId
      }
    });
    if (user === null) {
      user = await import_database.prisma.user.create({
        data: { id: spotifyId }
      });
    }
    const token = (0, import_tokens.generateAccessToken)(user.id);
    res.send({
      id: user.id,
      token
    });
  }
};
const me = async (req, res) => {
  const user = await import_database.prisma.user.findUnique({
    where: {
      id: req.user.id
    },
    include: {
      favorites: true
    }
  });
  res.send({
    id: req.user.id,
    savedEpisodes: user.favorites.map((f) => ({
      id: f.episodeId
    }))
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createUser,
  me
});
