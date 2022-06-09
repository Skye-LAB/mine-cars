const db = require("../models/");
const Vehicle = db.vehicle;
const Usage = db.usage;

exports.findAll = (req, res) => {
  Vehicle.find()
    .populate("usage")
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
  const usage = Usage({
    bbm: 0,
    jarakTotal: 0,
    serviceHari: Date.now(),
    serviceTerakhir: Date.now()
  })

  usage.save(usage).then(result => {
    const vehicle = Vehicle({
      plat: req.body.plat,
      jenis: req.body.jenis,
      merk: req.body.merk,
      usage: result.id
    });

    vehicle
      .save(vehicle)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(409).send({
          msg: err.message || "something went wrong",
        });
      });
  })

};
