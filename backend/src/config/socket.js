import { Server } from "socket.io";
import http from "http";
import express from "express";

// 1. Create the Express app here instead of index.js
const app = express();

// 2. Create a standard HTTP server on top of the Express app
const server = http.createServer(app);

// 3. Attach Socket.io to the HTTP server
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"], 
  },
});

export function getRecieverSocketId(userID) {
    return userSocketMap[userID];
}

//used to store all online users
const userSocketMap={};
// 4. Listen for incoming connections
io.on("connection", (socket) => {
  console.log("A user connected with socket id:", socket.id);
  const userId=socket.handshake.query.userId;
  if(userId) userSocketMap[userId]=socket.id

  //io.emit() is used to send events to all connected clients
  io.emit("getOnlineUsers",Object.keys(userSocketMap));

  // Listen for disconnections
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
  });
});

export { app, io, server };