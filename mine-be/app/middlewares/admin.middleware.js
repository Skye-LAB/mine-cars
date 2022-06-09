module.exports = (req, res, next) => {
  const role = req.header("role");
  if (role != 2) return res.status(401).send("Access Denied!");

  if (role == 2) {
    next();
  } else {
    res.status(401).send({ msg: "Access Denied!" })
  }
};
