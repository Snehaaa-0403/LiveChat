import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../config/cloudinary.js";
import { getReceiverSocketId ,io } from "../config/socket.js";
import { redis } from "../config/redis.js";

export const getUsersForSideBar = async(req,res) => {
    try {
        const loggedInUserId = req.user._id.toString();
    
        const cacheKey = `sidebar_users:${loggedInUserId}`;

        const cachedUsers = await redis.get(cacheKey);
        if (cachedUsers) {
            console.log("Serving sidebar users from Redis Cache! 🚀");
            return res.status(200).json(JSON.parse(cachedUsers));
        }

        console.log("Fetching sidebar users from MongoDB... 🐢");

        const users = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        if (users.length > 0) {
            await redis.set(cacheKey, JSON.stringify(users), "EX", 3600);
        }

        res.status(200).json(users);
    }
    catch(error){
        console.log("Error in loading all users :",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const getAllMessages = async(req,res) => {
    try{
        const myID=req.user._id;
        const {id:userToChatId} = req.params;
        
        const chatKey = `chat_messages:${[myID, userToChatId].sort().join("_")}`;
        
        const cachedMessages = await redis.get(chatKey);
        if (cachedMessages) {
            console.log("Serving from Redis! ⚡️");
            return res.status(200).json(JSON.parse(cachedMessages));
        }

        const messages=await Message.find({
            $or:[
                {senderId:userToChatId,receiverId:myID},
                {senderId:myID,receiverId:userToChatId}
            ]
        });

        if (messages.length > 0) {
            await redis.set(chatKey, JSON.stringify(messages), "EX", 3600);
        }

        res.status(200).json(messages);
    }
    catch(error){
        console.log("Error in getting messages :",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const sendMessage = async(req,res) => {
    try{
        const {text,image}=req.body;
        const senderId=req.user._id;
        const {id:receiverId}=req.params;
        let imageURL;
        if(image){
            const uploadedResponse=await cloudinary.uploader.upload(image);
            imageURL=uploadedResponse.secure_url;
        }
        const newMessage=await Message.create({
            senderId,
            receiverId,
            text,
            image:imageURL
        })
        
        // Delete the old cache!
        const chatKey = `chat_messages:${[senderId, receiverId].sort().join("_")}`;
        await redis.del(chatKey);

        const recieverSocketID = await getReceiverSocketId(receiverId);
        if(recieverSocketID){
            io.to(recieverSocketID).emit("newMessage",newMessage);
        }
        res.status(200).json(newMessage);
    }
    catch(error){
        console.log("Error in sending messages :",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}