import User from "../models/user.js";
import createError from "../utils/createError.js";

export const register = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: "aman" });
    if (!user) return next(createError(404, "User not found!"));

    res.status(201).send("Register routes");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  res.send("Login route");
};
