import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Sign Up controller
export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Email is already in use.",
      });
    }

    // Check if a user with the same username already exists
    const existingUserName = await User.findOne({ username });
    if (existingUserName) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Username is already in use.",
      });
    }

    // If email is unique, proceed with user creation
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json("User created successfully!!!");
  } catch (error) {
    next(error);
  }
};

// Sign In controller
export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Check if a user does not existed
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res
        .status(404)
        .json({ success: false, statusCode: 404, message: "User not found!" });
    }

    // Check if a wrong password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Wrong password!",
      });
    }

    const { password: pass, ...rest } = validUser._doc;
    const accessToken = jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "2m" }
    );

    const refreshToken = jwt.sign(
      { id: validUser._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

// Sign out controller

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "Refresh token is required",
    });
  }

  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // (Optional) check user còn tồn tại không
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Tạo access token mới
    const newAccessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    return res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
};
