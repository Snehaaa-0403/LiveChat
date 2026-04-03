import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getUsersForSideBar,getAllMessages,sendMessage } from "../controllers/message.cont.js";

const router=express.Router();

router.get("/users",protectRoute,getUsersForSideBar);
router.get("/:id",protectRoute,getAllMessages);
router.post("/send/:id",protectRoute,sendMessage);

export default router;