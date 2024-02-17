

// Importing necessary modules and files

import GenerateToken from "../utils/generateToken.js";
import User from "../models/UserModel.js";
import asyncHandler from "express-async-handler"; // Use the npm package
import jwt from "jsonwebtoken";

// Controller function to authenticate user/login
const authUser = asyncHandler(async (req, res) => {
  // Destructuring email and password from the request body
  const { email, password } = req.body;
  // Finding the user in the database based on the provided email
  const user = await User.findOne({ email: email });

  // Validating user credentials
  if (user && (await user.matchPassword(password))) {
    // Generating a JWT token with user ID and setting expiration
    GenerateToken(res, user._id);

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    // Setting JWT as HTTP-Only cookie with secure and sameSite options
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    // Sending user details in the response
    res.json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    // Handling authentication failure with a 401 status and error message
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// Controller function to register users
const registerUsers = asyncHandler(async (req, res) => {
  const {email, name, password}=req.body
  const userExist=await User.findOne({email});
  if(userExist){
    res.status(400);
    throw new Error("User already exist")
  };
  const user = await User.create({
    name, email, password
  });
  if(user){
    GenerateToken(res, user._id);
    res.status(200).json({
      _id:user._id,
      name:user.name,
      email:user.email,
      isAdmin:user.isAdmin
    })
  }else{
    res.status(400);
    throw new Error("Invalid user data")
  }
 
});

// Controller function to log out users
const logoutUsers = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly:true,
    expires:new Date(0)
  });
  res.status(200).json({
    message:"Logged out successfully"
  })

});

// Controller function to get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user=await User.findById(req.user._id);
  if(user){
    res.status(200).json({
      _id:user._id,
      email:user.email,
      password:user.password,
      isAdmin:user.isAdmin 
    })
  }else{
    res.status(404);
    throw new Error("user not found")
  }
  
});

// Controller function to update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
const user=await User.findById(req.user._id);
if(user){
  user.name=req.body.name||user.name;
  user.email=req.body.email||user.email;

  if(req.body.password){
    user.password=req.body.password
  }

  const updatedUser=await user.save();
  res.status(200).json({
    _id:updatedUser._id,
    email:updatedUser.email,
    name:updatedUser.name,
    isAdmin:updatedUser.isAdmin
  })

}else{
  res.status(404);
  throw new Error("User not found")
}

});

// Controller function to get a specific user
const getUser = asyncHandler(async (req, res) => {
  // Placeholder response for fetching users
  res.send("get users");
});

// Controller function to delete users
const DeleteUsers = asyncHandler(async (req, res) => {
  res.send("delete user")
});

// Controller function to update users
const updateUsers = asyncHandler(async (req, res) => {
  res.send("update")
});

// Controller function to get user by ID
const getUserById = asyncHandler(async (req, res) => {
  // Fetching a specific user by ID from the database
  const user = await User.findById(req.params.id);

  // Checking if the user exists and sending the user data or an error message as a JSON response
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User does not exit")
  }
});


// Exporting all controller functions for use in other files
export {
  authUser,
  registerUsers,
  logoutUsers,
  getUserProfile,
  updateUserProfile,
  getUser,
  DeleteUsers,
  updateUsers,
  getUserById,
};
