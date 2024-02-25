import { admin, protect } from "../Middleware/authMiddleWare.js";
import { getProduct, getProductById } from "../controllers/productControllers.js";

import { createProduct } from "../controllers/productControllers.js";
import express from "express";
import { updateProduct } from "../controllers/productControllers.js";

const router = express.Router();

router.route("/").get(getProduct).post(protect, admin, createProduct)
router.route("/:id").get(getProductById).put(protect, admin, updateProduct)



export default router;
