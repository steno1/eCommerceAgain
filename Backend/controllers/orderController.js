// Importing the Order model and necessary middleware

import Order from "../models/OrderModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// Controller function to create a new order
const addOrderItem = asyncHandler(async(req, res) => {
    const {
        orderItems, 
        shippingAddress,
         paymentMethod,
         itemsPrice, 
         taxPrice,
        shippingPrice,
         totalPrice
    }=req.body;
    if(orderItems && orderItems.length===0){
        res.status(400);
        throw new Error("No order items")
    }else{
        const order = new Order({
            orderItems: orderItems && orderItems.map((x) => ({
                ...x,
                product: x.id,
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });
        
        const createOrder=await order.save();
        res.status(201).json(createOrder);
    }
});

// Controller function to retrieve orders for the logged-in user
const getMyOrders = asyncHandler(async(req, res) => {
    const orders=await Order.find({
        user:req.user_id
    });
    res.status(200).json(orders)
});

// Controller function to retrieve orders by ID
const getOrdersById = asyncHandler(async(req, res) => {
    const order=await Order.findById(req.params.id)
    .populate("user", "name email");
    if(order){
        res.status(200).json(order)
    }else{
        res.status(404);
        throw new Error("Order not found")
    }
});

// Controller function to update orders to paid status
const updateOrdersToPaid = asyncHandler(async(req, res) => {
    // Placeholder response for updating orders to paid status
    res.send("update orders to paid");
});

// Controller function to update order status to delivered
const updateToDelivered = asyncHandler(async(req, res) => {
    // Placeholder response for updating order status to delivered
    res.send("update order to delivered");
});

// Controller function to retrieve all orders (admin functionality)
const getAllOrders = asyncHandler(async(req, res) => {
    // Placeholder response for getting all orders (admin functionality)
    res.send("get all orders");
});

// Exporting all controller functions within curly braces
export {
    addOrderItem,
    getMyOrders,
    getOrdersById,
    updateOrdersToPaid,
    updateToDelivered,
    getAllOrders
};
