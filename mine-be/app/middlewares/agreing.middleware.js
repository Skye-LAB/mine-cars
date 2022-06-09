module.exports = (req, res, next) => {
  const role = req.header("role");
  if (role != 1) return res.status(401).send("Access Denied!");

  if (role == 1) {
    next();
  } else {
    res.status(401).send({ msg: "Access Denied!" })
  }
};
