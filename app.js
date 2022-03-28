const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require("./routes/authRoutes");
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb://localhost:27017/';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => {
    app.listen(3000)
    console.log("app is running on http://localhost:3000/")
    })
  .catch((err) => console.log(err));

// routes

app.use(authRoutes)