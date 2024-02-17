// Import statements with consistent quotes

import { Admin, protect } from "../Middleware/authMiddleware.js";
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

import express from "express";

const router = express.Router();

// Route definitions with consistent indentation
router.route("/")
    .get(Admin, protect, getUser)
    .post(registerUsers);

router.post("/logout", logoutUsers);
router.post("/auth", authUser);

router.route("/profile")
.get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router.route("/:id")
    .delete(protect,Admin,DeleteUsers)
    .get(protect,Admin,getUserById)
    .put(protect,Admin, updateUsers);

export default router;
