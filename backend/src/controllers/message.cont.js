import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../config/cloudinary.js";
import { getRecieverSocketId,io } from "../config/socket.js";

export const getUsersForSideBar = async(req,res) => {
    try{
        const loggedInUserId=req.user._id;
        const users=await User.find({_id:{$ne:loggedInUserId}}).select("-password");
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

        const messages=await Message.find({
            $or:[
                {senderId:userToChatId,receiverId:myID},
                {senderId:myID,receiverId:userToChatId}
            ]
        });

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

        const recieverSocketID = getRecieverSocketId(receiverId);
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