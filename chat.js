const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { PORT } = require("./config.js");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Un usuario se conectó:", socket.id);

  socket.on("chat-message", (msg) => {
    io.emit("chat-message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Un usuario se desconectó");
  });
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
