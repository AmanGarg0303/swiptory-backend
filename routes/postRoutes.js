import express from "express";
const router = express.Router();
import {
  createPost,
  getPostById,
  getPosts,
} from "../controllers/postController.js";
import { protect } from "../middlewares/jwt.js";

router.post("/", protect, createPost);

router.get("/", getPosts);

router.get("/:postId", getPostById);

export default router;
