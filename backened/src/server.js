const express = require("express");
const cors = require("cors");
const connect = require("./config/db");
const server = require("http").createServer(express);
const bookController = require("./controller/bookController");
const userController = require("./controller/user.controller");
const retailerController = require("./controller/retailer.controller")
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("What is socket: ", socket);
  console.log("Socket is active to be connected");

  socket.on("tracker", (payload) => {
    console.log("What is payload", payload);
    io.emit("tracker", payload);
  });
});

// app.listen(5000, () => console.log("server is active..."));

server.listen(4000, () => {
  console.log("Server is listening at port 4000...");
});

app.use('/book', bookController);
app.use('/user', userController);
app.use('/retailer', retailerController);

const start = async () => {
  await connect();
  app.listen(port, () => {
    console.log("listening to port 8000");
  });
};

module.exports = start;