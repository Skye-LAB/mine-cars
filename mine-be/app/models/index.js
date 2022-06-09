const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.DATABASE_URL;
db.user = require("./user.model")(mongoose);
db.vehicle = require("./vehicle.model")(mongoose);
db.usage= require("./usage.model")(mongoose);
db.booking= require("./booking.model")(mongoose);

module.exports = db;
