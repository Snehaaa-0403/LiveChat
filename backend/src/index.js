import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {app,server} from "./config/socket.js";


dotenv.config();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(cors({
    origin:"https://livechat-e2co.onrender.com",
    credentials:true //alow the cookies or authorization header to be sent along with the request
}))

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);

const PORT=process.env.PORT || 5001;
server.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
    connectDB();
})

