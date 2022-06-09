module.exports = (app) => {
  const users = require("../controllers/user.controller");
  const router = require("express").Router();
  const verifyToken = require("../middlewares/auth.middleware");
  const isAdmin = require("../middlewares/admin.middleware");

  router.post("/", users.create);
  router.post("/login", users.login);

  router.get("/role/:role", verifyToken, isAdmin, users.findAllWithRole);
  router.get("/", verifyToken, isAdmin, users.findAll);
  // router.get("/", users.findAll);
  router.get("/:id", verifyToken, users.findOne);

  router.put("/:id", verifyToken, users.update);
  router.delete("/:id", verifyToken, users.delete);

  app.use("/api/users", router);
};
