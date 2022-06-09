const db = require("../models/");
const Booking = db.booking;
const User = db.user;

exports.findAll = (req, res) => {
  Booking.find()
    .populate("employee", "username")
    .populate("agreing", "username")
    .populate({
      path: 'vehicle', model: "vehicles", select: "plat jenis merk", populate: [
        {
          path: "usage",
          model: "usages",
          select: "bbm jarakTotal serviceHari serviceTerakhir"
        }
      ]
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        msg: err.message | "Something going wrong",
      });
    });
};

exports.create = (req, res) => {
  User.findById(req.body.employee).then(result => {
    if (result.role < 0) {
      res.status(404).send({ msg: "Not a valid Employee" })
    }
  })

  User.findById(req.body.agreing).then(result => {
    if (result.role < 1) {
      res.status(404).send({ msg: "Not a valid Agreing Party" })
    }
  })

  const booking = Booking({
    employee: req.body.employee,
    agreing: req.body.agreing,
    vehicle: req.body.vehicle,
    tglPinjam: req.body.tglPinjam,
    tglKembali: req.body.tglKembali,
    status: 0
  })

  booking.save(booking).then(result => {
    res.send(result)
  }).catch((err) => {
    res.status(500).send({
      msg: err.message | "Something going wrong",
    });
  });
};

exports.agreeShow = (req, res) => {
  Booking.find({ agreing: req.params.agreingId })
    .populate("employee", "username")
    .populate("agreing", "username")
    .populate({
      path: 'vehicle', model: "vehicles", select: "plat jenis merk", populate: [
        {
          path: "usage",
          model: "usages",
          select: "bbm jarakTotal serviceHari serviceTerakhir"
        }
      ]
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        msg: err.message | "Something going wrong",
      });
    });
};

exports.agreeUpdate = (req, res) => {
  Booking.findByIdAndUpdate(
    { agreing: req.params.agreingId, _id: req.body.id },
    { status: req.body.status ? req.body.status : 1 }
  ).then(result => {
    if (!result) {
      res.status(404).send({ msg: "Booking not found" })
    }

    res.send({ msg: "Booking was updated" })
  }).catch((err) => {
    res.status(409).send({
      msg: err.message || "Something went error",
    });
  });
}

exports.empShow = (req, res) => {
  Booking.find({ employee: req.params.empId, status: 1 })
    .populate("employee", "username")
    .populate("agreing", "username")
    .populate({
      path: 'vehicle', model: "vehicles", select: "plat jenis merk", populate: [
        {
          path: "usage",
          model: "usages",
          select: "bbm jarakTotal serviceHari serviceTerakhir"
        }
      ]
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        msg: err.message | "Something going wrong",
      });
    });
};

exports.empUpdate = (req, res) => {
  Booking.findByIdAndUpdate(
    { employee: req.params.empId, _id: req.body.id },
    { status: req.body.status ? req.body.status : 2 }
  ).then(result => {
    if (!result) {
      res.status(404).send({ msg: "Booking not found" })
    }

    res.send({ msg: "Booking was updated" })
  }).catch((err) => {
    res.status(409).send({
      msg: err.message || "Something went error",
    });
  });
}
