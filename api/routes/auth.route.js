import express from "express";
import { register, login, logout } from "../controllers/auth.controller.js";

const router = express.Router();
//Register User
router.post("/register", register);

//Login User
router.post("/login", login);

// // Logout User

router.post("/logout", logout);

export default router;
