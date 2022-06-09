module.exports = (app) => {
  const vehicle = require("../controllers/vehicle.controller");
  const router = require("express").Router();
  const verifyToken = require("../middlewares/auth.middleware");
  const isAdmin = require("../middlewares/admin.middleware");

  router.get("/", verifyToken, vehicle.findAll);
  router.post("/", verifyToken, isAdmin, vehicle.create);

  app.use("/api/vehicles", router);
};
