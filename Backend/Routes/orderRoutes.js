// Import statements with consistent quotes

import {
    addOrderItem,
    getAllOrders,
    getMyOrders,
    getOrdersById,
    updateOrdersToPaid,
    updateToDelivered
} from "../controllers/orderController.js";
import { admin, protect } from "../Middleware/authMiddleWare.js";

import express from "express";

const router = express.Router();

// Route definitions with consistent indentation
router.route("/").get( protect, admin, getAllOrders)
    .post(protect, addOrderItem);

    router.route("/mine").get(protect, getMyOrders)
    router.route("/:id").get(protect, getOrdersById)
    router.route("/:id/pay").put(protect, updateOrdersToPaid);
    router.route("/:id/deliver").put(protect, admin, updateToDelivered)



export default router;
