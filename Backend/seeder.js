import Order from "./models/OrderModel.js";
import Product from "./models/ProductModel.js";
import User from "./models/UserModel.js";
import colors from "colors";
import connectDB from "../config/db.js";
import dotenv from "dotenv"
import mongoose from "mongoose";
import products from "./data/products.js";
import users from "./data/user.js";

dotenv.config();
connectDB();

const importData=async ()=>{
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createUsers=await User.insertMany(users);
         const adminUser=createUsers[0]._id;
         const sampleProduct=products.map((product)=>{
            return {
                ...product,
                user:adminUser
            }
         });
         await Product.insertMany(sampleProduct);
         console.log(`data imported`.green.inverse)
         process.exit()
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1)
    }
}

const destroyData=async ()=>{
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log(`data destroyed!`.red.inverse);
        process.exit();

    } catch (error) {
       console.log(`${error}`.red.inverse);
       process.exit(1)
}
}



if(process.argv[2]==="-d"){
    destroyData()
}else{
    importData();
}

