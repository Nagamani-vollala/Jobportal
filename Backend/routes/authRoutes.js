import express from "express";
import { login, registerUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);

console.log("Auth routes loaded");

export default router;
