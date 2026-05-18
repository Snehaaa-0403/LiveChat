import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

export const redis = new Redis(process.env.REDIS_URI);

redis.on("connect", () => {
    console.log("Redis connected successfully! 🚀");
});

redis.on("error", (error) => {
    console.error("Redis connection error ❌:", error);
});