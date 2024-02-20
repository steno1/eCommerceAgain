// Import statements with consistent quotes

import {
    DeleteUsers,
    authUser,
    getUser,
    getUserById,
    getUserProfile,
    logoutUsers,
    registerUsers,
    updateUserProfile,
    updateUsers,
} from "../controllers/userController.js";
import { admin, protect } from "../Middleware/authMiddleware.js";

import express from "express";

const router = express.Router();

// Route definitions with consistent indentation
router.route("/")
    .get(admin, protect, getUser)
    .post(registerUsers);

router.post("/logout", logoutUsers);
router.post("/auth", authUser);

router.route("/profile")
.get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router.route("/:id")
    .delete(protect,admin,DeleteUsers)
    .get(protect,admin,getUserById)
    .put(protect,admin, updateUsers);

export default router;
