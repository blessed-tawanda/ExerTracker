const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");


require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log(`MongoDB database connection established successsfully`)
});

const exercisesHandler = require('./routes/excercises');
const usersHandler = require('./routes/users.js');

app.use('/excercises', exercisesHandler);
app.use('/users', usersHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})