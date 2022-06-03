var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
let counter = 0;
app.get("/", function (req, res) {
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
});

http.listen(3000, () => {
  console.log("listening on 3000");
});
