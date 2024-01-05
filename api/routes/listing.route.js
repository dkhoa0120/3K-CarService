import express from "express";
import { verifyToken } from "../utils/vertifyUser.js";
import {
  createList,
  deleteList,
  getListById,
  getListings,
  updateList,
} from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createList);
router.delete("/delete/:id", verifyToken, deleteList);
router.post("/update/:id", verifyToken, updateList);
router.get("/get/:id", getListById);
router.get("/get", getListings);

export default router;
