const { count } = require("console");
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);
let counter = 0;
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  counter++;
  io.emit("user", counter);
  socket.on("disconnect", () => {
    console.log("user disconnected");
    counter--;
    io.emit("user", counter);
  });
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  io.emit("some event", {
    someProperty: "some value",
    otherProperty: "other value",
  }); // This will emit the event to all connected sockets
});

server.listen(3000, () => {
  console.log("listening 3000");
});
