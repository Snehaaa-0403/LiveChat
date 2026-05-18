import { Server } from "socket.io";
import http from "http";
import express from "express";
import { redis } from "./redis.js"; 

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"], 
        methods: ["GET", "POST"],
    },
});

export const getReceiverSocketId = async (receiverId) => {
    return await redis.get(`user_socket:${receiverId}`);
};

io.on("connection", async (socket) => {
    console.log("A user connected:", socket.id);
    const userId = socket.handshake.query.userId;

    if (userId && userId !== "undefined") {
        // Save to Redis: Link their ID to this specific network pipe
        await redis.set(`user_socket:${userId}`, socket.id);
        // Save to Redis: Add them to the master online list
        await redis.sadd("online_users", userId);
    }

    // Grab the fresh list of online users from Redis and broadcast it
    const currentOnlineUsers = await redis.smembers("online_users");
    io.emit("getOnlineUsers", currentOnlineUsers);

    
    socket.on("disconnect", async () => {
        console.log("User disconnected:", socket.id);

        if (userId && userId !== "undefined") {
            // Remove from Redis: Delete their network pipe record
            await redis.del(`user_socket:${userId}`);
            
            // Remove from Redis: Take them off the online list
            await redis.srem("online_users", userId);

            // Grab the updated list and broadcast it so their green dot disappears
            const updatedOnlineUsers = await redis.smembers("online_users");
            io.emit("getOnlineUsers", updatedOnlineUsers);
        }
    });
});

export { app, io, server };