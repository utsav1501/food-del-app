import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login user
const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await userModel.findOne({email});
        if(!user){
            res.json({success:false,message:"User doesn't exist"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        
        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"})
        }

        const token=createToken(user._id);
        res.json({success:true,token})

    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const registerUser=async(req,res)=>{
    const {name,password,email}=req.body;
    try{
        //checking user exists or not
        const existingEmail=await userModel.findOne({email})
        if(existingEmail){
            return res.json({success:false,message:"User Already Exists ,Please Login"})
        }
        //validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }

        if(password.length<8){
            res.json({success:false,message:"Please enter password of length greater than 8"})
        }

        // hashing user password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=new userModel({
            name:name,
            email:email,
            password:hashedPassword,
        })

        const user=await newUser.save();
        const token=createToken(user._id);

        res.json({success:true,token});
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {loginUser,registerUser};