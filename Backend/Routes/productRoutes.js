import { getProduct, getProductById } from "../controllers/productControllers.js";

import express from "express";

const router = express.Router();

router.route("/").get(getProduct);
router.route("/:id").get(getProductById);

export default router;
