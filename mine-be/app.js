const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./app/models");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.log(`Cannot connect to database, ${err}`);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ msg: "Mine cars api" });
});

require("./app/routes/user.route")(app);
require("./app/routes/vehicle.route")(app);
require("./app/routes/booking.route")(app);
require("./app/routes/usage.route")(app);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
