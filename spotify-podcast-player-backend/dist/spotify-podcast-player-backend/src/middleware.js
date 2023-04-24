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
var middleware_exports = {};
__export(middleware_exports, {
  authenticateJWT: () => authenticateJWT
});
module.exports = __toCommonJS(middleware_exports);
var import_tokens = require("./tokens");
var import_database = require("./database");
const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  req.user = null;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const userId = (0, import_tokens.verifyAccessToken)(token);
    if (userId !== null) {
      const user = await import_database.prisma.user.findUnique({
        where: {
          id: userId
        }
      });
      if (user !== null) {
        req.user = user;
        return next();
      }
    }
  }
  res.sendStatus(403);
  return;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authenticateJWT
});
