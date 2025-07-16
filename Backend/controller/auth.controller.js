import genToken from "../config/token.js"
import User from "../models/user.js"
import bcrypt from "bcryptjs"
export const signUp=async(req,res)=>{
    try {
        let {name,email,password}= req.body;
        console.log(req.body);
        let existUser= await User.findOne({email})
        if(existUser){
            return res.status(404).json({message:"User is alredy exists"})
        }
        let hashPassword=await bcrypt.hash(password,10)
        let user=await User.create({name:name,email:email,password:hashPassword})
        let token= await genToken(user._id)
        console.log(user)
        res.cookie("token",token,{
            httponly:true,
            secure:process.env.NODE_ENVIRONMENT="Production",
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        })
        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json({message:`sinUp error ${error}`})
        // console.log("error find")
    }
}
