const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { PORT } = require("./config.js");

const app = express();

// CORS para requests http normales
app.use(cors({ origin: "*" }));

const server = http.createServer(app);

// CORS para socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
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
