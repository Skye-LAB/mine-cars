module.exports = (app) => {
  const booking = require("../controllers/booking.controller");
  const router = require("express").Router();
  const verifyToken = require("../middlewares/auth.middleware");
  const isAdmin = require("../middlewares/admin.middleware");
  const isAgree = require("../middlewares/agreing.middleware");

  router.get("/", verifyToken, isAdmin, booking.findAll);
  router.post("/", verifyToken, isAdmin, booking.create);

  router.get("/agree/:agreingId", verifyToken, isAgree, booking.agreeShow);
  router.post("/agree/:agreingId", verifyToken, isAgree, booking.agreeUpdate);

  router.get("/emp/:empId", verifyToken, booking.empShow)
  router.post("/emp/:empId", verifyToken, booking.empUpdate)

  app.use("/api/bookings", router);
};
