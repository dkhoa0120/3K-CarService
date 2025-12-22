import express from "express";
import {
  Test,
  deleteUser,
  getUserListings,
  updateUser,
  fetchUserData,
} from "../controllers/user.controller.js";
import { verifyToken, authToken } from "../utils/vertifyUser.js";

const router = express.Router();

router.get("/", Test);

router.post("/update/:id", verifyToken, updateUser);

router.delete("/delete/:id", verifyToken, deleteUser);

router.get("/fetch-user", authToken, fetchUserData);

router.get("/listing/:id", verifyToken, getUserListings);

export default router;
