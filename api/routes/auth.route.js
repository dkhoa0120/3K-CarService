import express from "express";
import {
  signIn,
  signOut,
  signUp,
  refreshToken,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signUp);

router.post("/signin", signIn);

router.post("/signout", signOut);

router.post("/refresh-token", refreshToken);

export default router;
