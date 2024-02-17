import User from "../models/UserModel.js";
import asyncHandler from "express-async-handler"; // Use the npm package
import jwt from "jsonwebtoken";

const protect=asyncHandler(async(req, res, next)=>{

let token=req.cookies.jwt;
if(token){
try {
    const decoded=jwt.verify(token, process.env.JWT_SECRET);
   req.user= await User.findById(decoded.userId).select("-password")
   next();
} catch (error) {
    console.log(error)
    res.status(401);
    throw new Error("Not Authorized, Token failed")

}
}else{
    res.status(401);
    throw new Error("Not Authorized, no token")
}
})

const Admin=asyncHandler(async(req, res, next)=>{
if(req.user && req.user.isAdmin){
    next();
}else{
    res.status(401);
    throw new Error("Not Authorized as an Admin")
}
})
export {Admin, protect}