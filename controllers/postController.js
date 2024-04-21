import Post from "../models/post.js";
import createError from "../utils/createError.js";

export const createPost = async (req, res, next) => {
  try {
    const { userId, post, category } = req.body;
    if (!userId || !post || !category)
      return next(createError(400, "All fields are required!"));

    const newPost = await Post({
      post,
      category,
      userId,
    });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findById(postId);
    if (!post) return next(createError(404, "Post not found!"));

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};