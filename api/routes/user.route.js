import express from "express";
import { Test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/vertifyUser.js";

const router = express.Router();

router.get("/", Test);

router.post("/update/:id", verifyToken, updateUser);

export default router;
