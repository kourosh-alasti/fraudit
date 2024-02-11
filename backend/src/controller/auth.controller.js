import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { username, email, password, fname, lname } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    !fname ||
    username === "" ||
    email === "" ||
    password === "" ||
    fname === ""
  ) {
    // ERROR HANDLER
    next();
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    fname,
    lname: lname === "" ? "" : lname,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json("Registration Successful!");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    // ERROR HANDLER
    next();
  }

  try {
    const user = await User.findOne({ username });
    const isValidPassword = bcryptjs.compareSync(password, user.password);

    if (!user) {
      // ERROR HANDLER
      return next();
    }

    if (!isValidPassword) {
      // ERROR HANDLER
      return next();
    }

    const jwToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = user._doc;

    res
      .status(200)
      .cookie("access_token", jwToken, { httpOnly: true })
      .json(rest);
  } catch (err) {
    next(err);
  }
};
