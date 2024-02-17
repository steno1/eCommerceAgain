// Import statements with consistent quotes

import { Admin, protect } from "../Middleware/authMiddleware.js";
import {
    addOrderItem,
    getAllOrders,
    getMyOrders,
    getOrdersById,
    updateOrdersToPaid,
    updateToDelivered
} from "../controllers/orderController.js";

import express from "express";

const router = express.Router();

// Route definitions with consistent indentation
router.route("/").get( protect,Admin, getAllOrders)
    .post(protect, Admin, addOrderItem);

    router.route("/mine").get(protect, getMyOrders)
    router.route("/:id").get(protect, getOrdersById)
    router.route("/:id/pay").put(protect, updateOrdersToPaid);
    router.route("/:id/deliver").put(protect, Admin, updateToDelivered)



export default router;
