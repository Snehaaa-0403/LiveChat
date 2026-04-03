import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";


export const signup = async(req,res)=>{
    const {fullName,email,password} = req.body;
    try{
        if(!email || !fullName || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Email already exists" });

        const salt=await bcrypt.genSalt(10);
        const hashesPassword=await bcrypt.hash(password,salt);
        const newUser=await User.create({
            fullName,
            email,
            password:hashesPassword
        });

        //generateToken
        const token=jwt.sign({userId:newUser._id},process.env.JWT_SECRET,{
            expiresIn:"7d"
        })
        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
            httpOnly: true, // prevents XSS attacks
            sameSite: "none", // prevents CSRF attacks
            secure: true,
        });
        
        // Added the success response
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
        });
    }
    catch(error){
        console.log("Error in signup controller :",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const login = async(req,res)=>{
    const{email,password}=req.body;
    try{
       const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        //genrate Token(Valid User)
        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{
            expiresIn:"7d"
        })
        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
            httpOnly: true, // prevents XSS attacks
            sameSite: "none", // prevents CSRF attacks
            secure: true,
        });
        //send success message
        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });
    }
    catch(error){
        console.log("Error in login controller :",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const logout = (req,res)=>{
    try{
        res.cookie("jwt", "", {
            maxAge: 0, 
            httpOnly: true, 
            sameSite: "none", 
            secure: true,
        });
        res.status(200).json({message:"Logged Out successfully"});
    }
    catch(error){
        console.log("Error in login controller :",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const updateProfile = async(req,res)=>{
    try{
        const userId=req.user._id;
        const {profilePic} = req.body;
        if(!profilePic){
            return res.status(400).json({message:"Profile Pic is required"});
        }
        const uploadedResponse=await cloudinary.uploader.upload(profilePic);
        const updatedUser=await User.findByIdAndUpdate(userId,{profilePic:uploadedResponse.secure_url},{new:true});
        res.status(200).json(updatedUser);
    }
    catch(error){
        console.log("Error in uploading image :",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const checkAuth = (req,res)=>{
    try{
        res.status(200).json(req.user);
    }
    catch(error){
        console.log("User is not authenticated :",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}