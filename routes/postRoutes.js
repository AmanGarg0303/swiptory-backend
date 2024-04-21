import express from "express";
const router = express.Router();
import {
  createPost,
  getPostById,
  getPosts,
} from "../controllers/postController.js";

router.post("/", createPost);

router.get("/", getPosts);

router.get("/:postId", getPostById);

export default router;
