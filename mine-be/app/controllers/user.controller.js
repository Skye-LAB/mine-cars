const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { registerVal, loginVal } = require("../validators/auth.validation");
const db = require("../models/");
const User = db.user;

const emailExist = async (email) => {
  const mailExist = await User.findOne({ email: email });
  if (mailExist == true) {
    return true;
  }

  return false;
};

const genHashedPass = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

exports.create = async (req, res) => {
  const { error } = registerVal(req.body);

  if (error) return res.status(400).send(error.details[0].message);
  if (await emailExist(req.body.email))
    return res.status(400).send("Email already exists");

  password = await genHashedPass(req.body.password);

  const user = new User({
    username: req.body.username,
    role: req.body.role ? req.body.role : 0,
    email: req.body.email,
    password: password,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(409).send({
      msg: err.message || "Something went error",
    });
  }
};

exports.login = async (req, res) => {
  const { error } = loginVal(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is not exists");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  const token = jwt.sign({ id: user.id }, process.env.TOKEN);
  res.header("auth-token", token).send({
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    token: token,
  });
};

exports.findAll = (req, res) => {
  User.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        msg: err.message || "Something went error",
      });
    });
};

exports.findAllWithRole = (req, res) => {
  User.find({ role: req.params.role })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        msg: err.message || "Something went error",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(409).send({
        msg: err.message || "Something went error",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { new: true })
    .then((result) => {
      if (!result) {
        res.status(404).send({
          msg: "User not found",
        });
      }

      res.send({
        msg: "User was updated",
      });
    })
    .catch((err) => {
      res.status(409).send({
        msg: err.message || "Something went error",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          msg: "User not found",
        });
      }

      res.send({
        msg: "User was deleted",
      });
    })
    .catch((err) => {
      res.status(409).send({
        msg: err.message || "Something went error",
      });
    });
};
