import express from "express";
import {login, logout, register, updateProfile} from "../controllers/user.controller.js";
import isAuthenticated from "../Middleware/isAuthenticated.middleware.js";
import { singleUpload } from "../Middleware/multer.middleware.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);

export default router;