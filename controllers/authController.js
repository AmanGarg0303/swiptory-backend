import User from "../models/user.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return next(createError(400, "All fields are required!"));

    if (username.length < 4) {
      return next(
        createError(400, "Username should be atleast 4 charaacters long.")
      );
    }
    if (password.length < 5) {
      return next(
        createError(400, "Password should be atleast 5 charaacters long.")
      );
    }

    const user = await User.findOne({ username });
    if (user)
      return next(createError(409, "User with this name already exists!"));

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPass,
    });

    // console.log(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return next(createError(400, "All fields are required!"));

    const user = await User.findOne({ username });
    if (!user) return next(createError(404, "Username not found!"));

    const isPassCorrect = await bcrypt.compare(password, user.password);

    if (isPassCorrect) {
      const { password, ...details } = user._doc;
      res.status(200).json(details);
    } else {
      return next(createError(400, "Invalid credentials!"));
    }
  } catch (error) {
    next(error);
  }
};
