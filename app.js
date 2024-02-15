const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const socketio = require("socket.io");

// @@

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set("view engine", "ejs");

// dotenv
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// database connection
const dbURI = process.env.DATABASE_URL || ''
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    var server = app.listen(PORT);
    var io = socketio(server);
    const socketioControl = require("./controllers/socketio");
    socketioControl(io);
    console.log(
      "Express server listening on port %d in %s mode",
      PORT,
      app.settings.env
    );
  })
  .catch((err) => console.log(err));

// routes
app.use(authRoutes);
module.exports.PORT = PORT;
