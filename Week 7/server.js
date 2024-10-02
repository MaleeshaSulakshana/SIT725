const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();

const server = http.createServer(app);
const io = socketIo(server);

require("./dbConnection");

let port = process.env.port || 3000;
let router = require("./routers/router");

app.use(express.static(__dirname + "/view"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/pets", router);

app.get("/", function (req, res) {
  res.render("index.html");
});

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
  setInterval(() => {
    socket.emit("number", parseInt(Math.random() * 10));
  }, 1000);
});

// Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
