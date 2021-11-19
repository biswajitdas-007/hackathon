const express = require("express");
const cors = require("cors");
const connect = require("./config/db");

const bookController = require("./controller/bookController");

const app = express();
app.use(cors());
app.use(express.json());

app.use('/book', bookController);

const start = async () => {
  await connect();
  app.listen(8000, () => {
    console.log("listening to port 8000");
  });
};

module.exports = start;