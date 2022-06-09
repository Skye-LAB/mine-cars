const db = require("../models/");
const Usage = db.usage;

exports.update = (req, res) => {
  Usage.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          msg: "Usage not found",
        });
      }

      res.send({
        msg: "Usage was updated",
      });
    })
    .catch((err) => {
      res.status(409).send({
        msg: err.message || "Something went error",
      });
    });
}
