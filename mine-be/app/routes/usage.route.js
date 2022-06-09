module.exports = (app) => {
  const usage = require("../controllers/usage.controller");
  const router = require("express").Router();
  const verifyToken = require("../middlewares/auth.middleware");
  const isAdmin = require("../middlewares/admin.middleware");

  router.get("/:id", verifyToken, isAdmin, usage.findOne);
  router.post("/:id", verifyToken, isAdmin, usage.update);

  app.use("/api/usages", router);
};
