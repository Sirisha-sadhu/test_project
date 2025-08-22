// socket.js
const { Server } = require("socket.io");
const { CORS_ALLOW_ORIGINS } = require("./index.config");

let io;

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5174"], // user + admin frontends
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("⚡ New client connected:", socket.id);

    // User joins a room (identified by their userId)
    socket.on("registerUser", (userId) => {
      socket.join(userId.toString());
      console.log(`User ${userId} joined room`);
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });

  return io;
}

function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
}

module.exports = { initSocket, getIO };
