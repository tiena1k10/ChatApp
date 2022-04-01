const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
var bodyParser = require('body-parser')
const socketio = require("socket.io");




const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set('view engine', 'ejs');
const PORT = 3000 || process.env.PORT;






// database connection
const dbURI = 'mongodb+srv://tiena1k10:Tiendz123@chatapp.do7ro.mongodb.net/ChatApp?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => {
    var server = app.listen(PORT)
    var io = socketio(server)
    const socketioControl = require("./controllers/socketio");
    socketioControl(io);
    console.log("app is running on http://localhost:3000/")
    })
  .catch((err) => console.log(err));

// routes
app.use(authRoutes);
module.exports.PORT = PORT